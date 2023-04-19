import jwtDecode from 'jwt-decode';
import { useState } from 'react';
import { useEffect } from 'react';

const useAuthToken = () => {
  const [token, setToken] = useState({ 'x-auth-token': null });

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem('user-token'));
    const decoded = jwtDecode(userToken['x-auth-token']);

    setToken(userToken);

    if (!decoded) return;
  }, []);

  return { 'x-auth-token': token['x-auth-token'] };
};

export default useAuthToken;
