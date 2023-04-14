import axios from 'axios';
import * as actions from '../api';
import { URL } from '../config/URL';

const vendor =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.vendorFetchBegan().type) {
      return next(action);
    }
    const { url, method, data, onSuccess, onError, authToken } = action.payload;

    try {
      dispatch({
        type: 'vendor/loading',
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
        type: 'vendor/loading',
        payload: false,
      });
    }
    // next(action);
  };

export default vendor;
