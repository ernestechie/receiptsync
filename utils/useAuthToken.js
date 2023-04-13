import React from 'react';
import jwtDecode from 'jwt-decode';

const useAuthToken = () => {
  const userToken = JSON.parse(localStorage.getItem('user-token'));
  const decoded = jwtDecode(userToken['x-auth-token']);

  if (!decoded) return;

  return { 'x-auth-token': userToken['x-auth-token'] };
};

export default useAuthToken;
