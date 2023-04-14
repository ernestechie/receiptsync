import { createSlice } from '@reduxjs/toolkit';
import { URL } from '../config/URL';
import { vendorFetchBegan } from '../api';
import useAuthToken from '../../utils/useAuthToken';

const vendor = createSlice({
  name: 'vendor',
  initialState: {
    data: {},
    loading: false,
    loggedIn: false,
    token: null,
  },
  reducers: {
    loading: (state, action) => {
      state.loading = action.payload;
    },
    set: (state, action) => {
      state.data = { ...action.payload };
      state.loading = false;
    },
    update: (state, action) => {
      console.log('Vendor data updated');
    },
    remove: (state, action) => {
      console.log('Vendor deleted');
    },
    mutateAuthState: (state, action) => {
      state.loggedIn = action.payload;
      state.loading = false;
      console.log(action);
    },
    mutateAuthToken: (state, action) => {
      state.token = action.payload.token;
      state.loading = false;
    },
  },
});

export default vendor.reducer;
export const { set, update, remove, mutateAuthState, mutateAuthToken } =
  vendor.actions;

// ACTIONS
export const loadVendorData = () => (dispatch, getState) => {
  const authToken = useAuthToken();

  dispatch(
    vendorFetchBegan({
      url: `${URL}/vendors`,
      authToken,
      onSuccess: set,
    })
  );
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
      vendorFetchBegan({
        url: `${URL}/vendors`,
        authToken: { 'x-auth-token': token },
        onSuccess: set,
      })
    );
    dispatch(mutateAuthState(true));
    // window.location.replace('/vendor');
  };

export const logUserOut = () => (dispatch) => {
  localStorage.removeItem('user-token');
  window.location.replace('/login');

  dispatch(mutateAuthState(false));
};
