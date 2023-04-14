import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import api from './middleware/product';
import vendor from './middleware/vendor';
import reducer from './reducer';

// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
  return configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), api, vendor],
  });
}
