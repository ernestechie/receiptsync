import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { apiCallBegan } from '../api';
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
      state.receipts.unshift(action.payload);
      state.addedProducts = [];
    },
    edit: (state, action) => {
      console.log('Receipt edited');
      state.loading = false;
    },
    remove: (state, action) => {
      state.loading = false;
      state.receipts = state.receipts.filter(
        (product) => product._id !== action.payload.receiptId
      );

      console.log('Receipt Deleted');
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
    },
    removeProductFromReceipt: (state, action) => {
      state.addedProducts.splice(action.payload, 1);
    },
    mutateProductQuantity: (state, action) => {
      const { index, count, product } = action.payload;
      state.addedProducts.splice(index, count, product);
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
  mutateProductQuantity,
} = receiptSlice.actions;

// ACTION CREATORS
export const loadReceipts = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.receipts;
  const authToken = JSON.parse(localStorage.getItem('user-token'));

  const diff = moment().diff(moment(lastFetch), 'minutes');

  if (typeof diff === 'number' && diff <= 15) return;

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

export const changeProductQuantity = (id, quantity) => (dispatch, getState) => {
  const {
    entities: { receipts },
  } = getState();

  const product = receipts.addedProducts.find((product) => product._id === id);
  const index = receipts.addedProducts.findIndex(
    (product) => product._id === id
  );

  if (quantity > 0) {
    dispatch(
      mutateProductQuantity({
        index,
        count: 1,
        product: {
          ...product,
          quantity,
          cost: quantity * product.price,
        },
      })
    );
  }
};

export const addReceipt =
  ({ token, data }) =>
  (dispatch) => {
    if (token) {
      dispatch(loading(true));

      dispatch(
        apiCallBegan({
          url: `${URL}/receipts`,
          method: 'post',
          authToken: { 'x-auth-token': token },
          data,
          onSuccess: add,
          onError: logError,
        })
      );
    }
  };

export const deleteReceipt = (id) => (dispatch) => {
  const authToken = JSON.parse(localStorage.getItem('user-token'));

  if (authToken) {
    dispatch(loading(true));

    dispatch(
      apiCallBegan({
        url: `${URL}/receipts/${id}`,
        method: 'delete',
        authToken,
        data: { receiptId: id },
        onSuccess: remove,
        onError: logError,
      })
    );
  }
};
