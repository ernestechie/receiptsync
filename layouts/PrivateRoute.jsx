import React, { useContext, useEffect } from 'react';
import authContext from '../context/AuthContext';
import { useRouter } from 'next/router';
import { Loader } from '../components';

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useContext(authContext);

  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn && !isLoading) router.replace('/login');
  }, [router, isLoggedIn, isLoading]);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && isLoggedIn && <>{children}</>}
    </>
  );
};

export default PrivateRoute;
