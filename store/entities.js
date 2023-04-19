import { combineReducers } from 'redux';
import authReducer from './slices/authSlice';
import productsReducer from './slices/productSlice';

export default combineReducers({
  products: productsReducer,
  vendor: authReducer,
});
