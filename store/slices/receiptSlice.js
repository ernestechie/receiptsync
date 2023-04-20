import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { apiCallBegan, apiCallFailed } from '../api';
import { URL } from '../config/URL';

const receiptSlice = createSlice({
  name: 'receipts',
  initialState: {
    receipts: [],
    loading: false,
    lastFetch: null,
    addedProducts: [],
  },
  reducers: {
    loading: (state, action) => {
      state.loading = action.payload;
    },
    add: (state, action) => {
      state.loading = false;
      state.lastFetch = new Date().getTime();
    },
    edit: (state, action) => {
      console.log('Receipt edited');
      state.loading = false;
    },
    remove: (state, action) => {
      state.loading = false;
    },

    setAll: (state, action) => {
      state.loading = false;
      state.lastFetch = new Date().getTime();
      state.receipts = action.payload;
    },
    logError: (state, action) => {
      state.loading = false;
      console.log(action.payload);
    },
    addProductToReceipt: (state, action) => {
      state.addedProducts.push(action.payload);
      console.log(state.addedProducts);
    },
    removeProductFromReceipt: (state, action) => {
      state.addedProducts.splice(action.payload, 1);
      console.log(state.addedProducts);
    },
  },
});

export default receiptSlice.reducer;
export const {
  add,
  remove,
  edit,
  setAll,
  logError,
  loading,
  addProductToReceipt,
  removeProductFromReceipt,
} = receiptSlice.actions;

// ACTION CREATORS
export const loadReceipts = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.receipts;
  const authToken = JSON.parse(localStorage.getItem('user-token'));

  const diff = moment().diff(moment(lastFetch), 'minutes');

  if (typeof diff === 'number' && diff <= 10) return;

  dispatch(loading(true));
  dispatch(
    apiCallBegan({
      url: `${URL}/receipts`,
      authToken,
      onSuccess: setAll,
      onError: logError,
    })
  );
};

export const addNewProductToReceipt = (id) => (dispatch, getState) => {
  const {
    entities: {
      products: { products },
      receipts,
    },
  } = getState();

  const productInArray = receipts.addedProducts.find(
    (product) => product._id === id
  );

  if (productInArray) {
    console.log(productInArray);
    const productIndex = receipts.addedProducts.findIndex(
      (product) => product._id === id
    );

    dispatch(removeProductFromReceipt(productIndex));
  } else {
    const currentProduct = products.find((product) => product._id === id);

    dispatch(
      addProductToReceipt({
        ...currentProduct,
        quantity: 1,
        cost: currentProduct?.price,
      })
    );
  }
};
