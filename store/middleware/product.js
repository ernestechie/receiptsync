import axios from 'axios';
import * as actions from '../api';
import { URL } from '../config/URL';
import { toast } from 'react-hot-toast';

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan().type) {
      return next(action);
    }
    const { url, method, data, onSuccess, onError, authToken } = action.payload;

    try {
      dispatch({
        type: 'products/loading',
        payload: true,
      });

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
            toast.success('Products loaded');
            break;
          case 'post':
            toast.success('Product added');
            break;
          case 'delete':
            toast.success('Product deleted');
            break;
        }
      }
    } catch (err) {
      console.log(err);
      // dispatch(
      //   onError({
      //     error: err.message,
      //   })
      // );
      dispatch({
        type: 'products/loading',
        payload: false,
      });
    }
  };

export default api;
