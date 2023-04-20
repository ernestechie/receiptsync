import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { apiCallBegan, apiCallFailed } from '../api';
import { URL } from '../config/URL';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    loading: (state, action) => {
      state.loading = action.payload;
    },
    add: (state, action) => {
      const newProduct = {
        ...action.payload,
        imageUrl: `https://d13zppfo7b7q25.cloudfront.net/${action.payload.imageName}`,
      };

      state.loading = false;
      state.products.push(newProduct);
      state.lastFetch = new Date().getTime();
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

export const addProduct =
  ({ token, data }) =>
  (dispatch) => {
    if (token) {
      dispatch(
        apiCallBegan({
          url: `${URL}/products`,
          method: 'post',
          authToken: { 'x-auth-token': token },
          data,
          onSuccess: add,
          // onError: apiCallFailed.type,
        })
      );
    }
  };

export const deleteProduct =
  ({ token, productId }) =>
  (dispatch) => {
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
