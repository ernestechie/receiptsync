import { combineReducers } from 'redux';
import productsReducer from './slices/productSlice';
import vendorReducer from './slices/vendorSlice';

export default combineReducers({
  products: productsReducer,
  vendor: vendorReducer,
});
