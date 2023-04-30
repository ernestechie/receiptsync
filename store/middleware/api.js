import axios from 'axios';
import { apiCallBegan } from '../api';
import { URL } from '../config/URL';
import { toast } from 'react-hot-toast';

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== apiCallBegan().type) {
      return next(action);
    }
    const { url, method, data, onSuccess, onError, authToken, isRegistering } =
      action.payload;

    try {
      const res = await axios.request({
        baseURL: URL,
        url,
        method,
        data,
        headers: {
          common: authToken,
        },
      });

      if (res.status === 200 || res.status === 201) {
        console.log(res.data);
        if (method === 'delete') {
          // Returns the 'ID to be deleted'
          // This calls the corresponding reducer to delete the item locally via the ID
          dispatch(onSuccess(data));
        } else {
          if (isRegistering) {
            const authToken = res.headers['x-auth-token'];
            localStorage.setItem(
              'user-token',
              JSON.stringify({ 'x-auth-token': authToken })
            );
          }
          dispatch(onSuccess(res.data));
        }

        switch (method) {
          case 'get':
            toast.success('Loaded');
            break;
          case 'post':
            toast.success('Successful');
            break;
          case 'put':
            toast.success('Updated successfully');
          case 'patch':
            toast.success('Updated successfully');
            break;
        }
      }
    } catch (err) {
      console.log(err);
      if (err.response) {
        if (err.response.data) toast.error(err.response.data.error);
      } else {
        toast.error('Something went wrong');
      }

      dispatch(
        onError({
          error: err.message,
        })
      );
    }
  };

export default api;
