import { combineReducers } from 'redux';
import authReducer from './slices/authSlice';
import productsReducer from './slices/productSlice';
import receiptsReducer from './slices/receiptSlice';

export default combineReducers({
  products: productsReducer,
  vendor: authReducer,
  receipts: receiptsReducer,
});
