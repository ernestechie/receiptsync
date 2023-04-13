import { combineReducers } from 'redux';
import productsReducer from './slices/products';

export default combineReducers({
  products: productsReducer,
});
