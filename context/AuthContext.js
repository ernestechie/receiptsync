import { createContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  vendorData: {
    products: [],
    dateCreated: [],
    dateUpdated: [],
  },
  setIsLoggedIn: () => {},
  setVendorData: () => {},
  deleteProductHandler: () => {},
  editProductHandler: () => {},
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

            setVendorData({
              ...response.data,
              dateCreated: new Date('2020-01-02'),
              products: productsRes.data,
            });
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log('Token not found');
        setIsLoggedIn(false);
      }
      setIsLoading(false);
    };

    validateVendorToken();
  }, []);

  const deleteProductHandler = async (productId) => {
    const userToken = JSON.parse(localStorage.getItem('user-token'));
    const decoded = jwtDecode(userToken['x-auth-token']);

    if (userToken) {
      if (decoded) {
        toast.loading('Deleting...');
        try {
          const deleteReq = await axios.delete(
            `${process.env.NEXT_PUBLIC_API_ROUTE}/products/${productId}`,
            {
              headers: {
                common: { 'x-auth-token': userToken['x-auth-token'] },
              },
            }
          );
          if (deleteReq.status === 200) {
            const productsDuplicate = vendorData.products;

            const indexToDelete = productsDuplicate?.findIndex(
              (product) => product._id === productId
            );

            productsDuplicate.splice(indexToDelete, 1);

            setVendorData((prev) => ({
              ...prev,
              products: productsDuplicate,
            }));

            toast.success('Product deleted!');
          }
          console.log(deleteReq);
        } catch (error) {
          console.log(error);
        }
      }
    }
    setTimeout(() => {
      toast.dismiss();
    }, 500);
  };

  const editProductHandler = (productId) => {
    console.log('Edit: ' + productId);
  };

  return (
    <authContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        vendorData,
        setIsLoggedIn,
        setVendorData,
        deleteProductHandler,
        editProductHandler,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default authContext;
