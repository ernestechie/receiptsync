import { createAction } from '@reduxjs/toolkit';

export const apiCallBegan = createAction('api/callBegan');
export const vendorFetchBegan = createAction('vendor/fetchBegan');
export const vendorLogin = createAction('vendor/login');
export const vendorFetchFailed = createAction('vendor/fetchFailed');
export const apiCallSuccess = createAction('api/callSuccess');
export const apiCallFailed = createAction('api/callFailed');
export const setAll = createAction('products/setAll');
