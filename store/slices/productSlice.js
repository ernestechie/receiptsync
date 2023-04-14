import { createSlice } from '@reduxjs/toolkit';
import { URL } from '../config/URL';
import { apiCallBegan, apiCallFailed } from '../api';
import useAuthToken from '../../utils/useAuthToken';

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
    add: (products, action) => {
      console.log('Product added');
    },
    edit: (products, action) => {
      console.log('Product edited');
    },
    remove: (products, action) => {
      console.log('Product deleted');
    },
    restock: (products, action) => {
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

// ACTIONS

export const loadProducts = () => (dispatch, getState) => {
  // const { lastFetch } = getState().entities.bugs;
  const authToken = useAuthToken();

  // const diff = moment().diff(moment(lastFetch), 'minutes');

  // if (diff <= 10) return;

  dispatch(
    apiCallBegan({
      url: `${URL}/products`,
      authToken,
      onSuccess: setAll,
      // onError: apiCallFailed.type,
    })
  );
};
