import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment/moment';
import { apiCallBegan } from '../api';
import { URL } from '../config/URL';

const auth = createSlice({
  name: 'auth',
  initialState: {
    data: null,
    loading: false,
    loggedIn: false,
    token: null,
    lastFetch: null,
  },
  reducers: {
    loading: (state, action) => {
      state.loading = action.payload;
    },
    setVendorData: (state, action) => {
      state.data = { ...action.payload };
      state.loading = false;
      state.lastFetch = new Date().getTime();
    },
    updateVendorData: (state, action) => {
      console.log('Vendor data updated');
      state.lastFetch = new Date().getTime();
    },
    deleteVendor: (state, action) => {
      console.log('Vendor deleted');
    },
    mutateAuthState: (state, action) => {
      state.loggedIn = action.payload;
      state.loading = false;
    },
    mutateAuthToken: (state, action) => {
      state.token = action.payload.token;
      state.loading = false;
    },
    logError: (state, action) => {
      state.loading = false;
      console.log(action.payload);
    },
  },
});

export default auth.reducer;
export const {
  setVendorData,
  update,
  remove,
  mutateAuthState,
  loading,
  mutateAuthToken,
  logError,
} = auth.actions;

// ACTIONS
export const loadVendorData = () => (dispatch, getState) => {
  const { vendor } = getState().entities;
  const authToken = JSON.parse(localStorage.getItem('user-token'));
  const last = moment().diff(moment(vendor.lastFetch), 'minutes');

  console.log(`Last Fetch: ${last} Minutes ago`);

  if (typeof last === 'number' && last <= 15) return;

  dispatch(loading(true));
  dispatch(
    apiCallBegan({
      url: `${URL}/vendors`,
      authToken,
      onSuccess: setVendorData,
      onError: logError,
    })
  );
  dispatch(mutateAuthState(true));
  dispatch(mutateAuthToken({ token: authToken['x-auth-token'] }));
};

export const logUserIn =
  ({ token }) =>
  (dispatch) => {
    localStorage.setItem(
      'user-token',
      JSON.stringify({ 'x-auth-token': token })
    );

    dispatch(mutateAuthToken({ token }));
    dispatch(
      apiCallBegan({
        url: `${URL}/vendors`,
        authToken: { 'x-auth-token': token },
        onSuccess: setVendorData,
        onError: logError,
      })
    );
    dispatch(mutateAuthState(true));
  };

export const logUserOut = () => (dispatch) => {
  dispatch(mutateAuthState(false));
  localStorage.removeItem('user-token');

  window.location = '/login';
};
