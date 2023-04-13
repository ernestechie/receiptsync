import axios from 'axios';
import * as actions from '../api';
import { URL } from '../config/URL';

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan().type) {
      return next(action);
    }
    const { url, method, data, onSuccess, onError, authToken } = action.payload;

    // next(action);

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

      dispatch({
        type: 'products/loading',
        payload: true,
      });

      if (res.status === 200) {
        dispatch(
          onSuccess({
            products: res.data,
          })
        );
      }
    } catch (err) {
      console.log(err);
      dispatch(
        onError({
          error: err.message,
        })
      );
    }
  };

export default api;
