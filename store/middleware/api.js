import axios from 'axios';

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== 'actions.apiCallBegan().type') {
      return next(action);
    }
    const { url, method, data, onSuccess, onError } = action.payload;

    // next(action);

    try {
    } catch (err) {
      console.log(err);
    }
  };

export default api;
