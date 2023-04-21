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
    const { url, method, data, onSuccess, onError, authToken } = action.payload;

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
        if (method === 'delete') {
          dispatch(onSuccess(data));
        } else {
          dispatch(onSuccess(res.data));
        }

        switch (method) {
          case 'get':
            toast.success('Loaded');
            break;
          case 'post':
            toast.success('Successful');
            break;
        }
      }
    } catch (err) {
      console.log(err);
      if (err.message) toast.error(err.message);
      toast.error('Something went wrong');

      dispatch(
        onError({
          error: err.message,
        })
      );
    }
  };

export default api;
