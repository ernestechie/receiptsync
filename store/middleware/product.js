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

      if (res.status === 200) {
        dispatch(onSuccess(res.data));
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
