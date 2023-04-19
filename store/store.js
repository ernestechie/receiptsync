import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import auth from './middleware/auth';
import api from './middleware/product';
import reducer from './reducer';

// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
  return configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), api, auth],
  });
}
