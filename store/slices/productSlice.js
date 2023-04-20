import { createSlice } from '@reduxjs/toolkit';
import { URL } from '../config/URL';
import { apiCallBegan, apiCallFailed } from '../api';
import moment from 'moment';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    loading: (state, action) => {
      state.loading = action.payload
    },
    add: (state, action) => {
      console.log('Product added');
      state.loading = false;
    },
    edit: (state, action) => {
      console.log('Product edited');
      state.loading = false;
    },
    remove: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
      state.loading = false;
    },
    restock: (state, action) => {
      console.log('Restocked products');
    },
    setAll: (state, action) => {
      state.loading = false;
      state.lastFetch = new Date().getTime();
      state.products = action.payload;
    },
  },
});

export default productSlice.reducer;
export const { add, remove, restock, edit, setAll } = productSlice.actions;

// ACTION CREATORS
export const loadProducts = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.products;
  const authToken = JSON.parse(localStorage.getItem('user-token'));

  const diff = moment().diff(moment(lastFetch), 'minutes');

  if (typeof diff === 'number' && diff <= 10) return;

  dispatch(
    apiCallBegan({
      url: `${URL}/products`,
      authToken,
      onSuccess: setAll,
      // onError: apiCallFailed.type,
    })
  );
};

export const deleteProduct =
  ({ token, productId }) =>
  (dispatch, getState) => {
    if (token) {
      dispatch(
        apiCallBegan({
          url: `${URL}/products/${productId}`,
          method: 'delete',
          authToken: { 'x-auth-token': token },
          data: productId,
          onSuccess: remove,
          // onError: apiCallFailed.type,
        })
      );
    }
  };
