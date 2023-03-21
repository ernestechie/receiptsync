import { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  vendorData: {
    products: [],
  },
  setIsLoggedIn: () => {},
  setVendorData: () => {},
};

const authContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [vendorData, setVendorData] = useState({});

  useEffect(() => {
    const validateVendorToken = async () => {
      const userToken = JSON.parse(localStorage.getItem('user-token'));
      if (userToken) {
        try {
          const decoded = jwtDecode(userToken['x-auth-token']);
          if (decoded) {
            setIsLoggedIn(true);

            if (localStorage.getItem('vendor-data')) {
              const data = JSON.parse(localStorage.getItem('vendor-data'));
              setVendorData(data);
            } else {
              const response = await axios.get(
                `${process.env.NEXT_PUBLIC_API_ROUTE}/vendors`,
                {
                  headers: {
                    common: { 'x-auth-token': userToken['x-auth-token'] },
                  },
                }
              );
              const productsRes = await axios.get(
                `${process.env.NEXT_PUBLIC_API_ROUTE}/products`,
                {
                  headers: {
                    common: { 'x-auth-token': userToken['x-auth-token'] },
                  },
                }
              );

              setVendorData({ ...response.data, products: productsRes.data });
              localStorage.setItem(
                'vendor-data',
                JSON.stringify({ ...response.data, products: productsRes.data })
              );
            }
          } else {
            setIsLoggedIn(false);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log('Token not found');
      }
      setIsLoading(false);
    };

    validateVendorToken();
  }, []);

  return (
    <authContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        vendorData,
        setIsLoggedIn,
        setVendorData,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default authContext;
