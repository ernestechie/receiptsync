import { createContext, useState, useEffect } from 'react';

const initialState = {
  isLoggedIn: false,
  isLoading: false,
};

const authContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      clearTimeout();
    };
  }, []);

  return (
    <authContext.Provider
      value={{
        isLoggedIn,
        isLoading,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default authContext;
