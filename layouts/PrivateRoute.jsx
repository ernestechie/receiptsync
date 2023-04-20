/* eslint-disable react-hooks/exhaustive-deps */
import jwtDecode from 'jwt-decode';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../components';
import { loadVendorData } from '../store/slices/authSlice';
import { loadProducts } from '../store/slices/productSlice';

const PrivateRoute = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    entities: {
      vendor: { loggedIn, loading, data },
    },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(loadProducts());
    dispatch(loadVendorData());
  }, []);

  useEffect(() => {
    const authToken = JSON.parse(window.localStorage.getItem('user-token'));
    if (authToken) {
      const decoded = jwtDecode(authToken['x-auth-token']);
      if (decoded) return;
    }
    router.replace('/login');
  }, [router, loggedIn, loading, data]);

  return (
    <>
      {loading && <Loader />}
      {!loading && loggedIn && <>{children}</>}
    </>
  );
};

export default PrivateRoute;
