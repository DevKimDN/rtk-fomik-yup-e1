import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../middleware/api';

const initialState = {
  loading: false,
  loginError: null,
  registerError: null,
  loginSuccess: false,
  token: null
};

const userSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.loading = true;
    },
    userLogInSuccess: (state, action) => {
      state.loading = false;
      state.loginError = null;
      state.loginSuccess = true;
      state.token = action.payload.headers['x-auth-token'];
    },
    userLogInFailed: (state, action) => {
      state.loading = false;
      state.loginError = 'Invalid email or password.';
    },
    registerUserSuccess: (state, action) => {
      state.loading = false;
      state.registerError = null;
      state.loginSuccess = true;
      state.token = action.payload.headers['x-auth-token'];
    },
    registerUserFailed: (state, action) => {
      state.registerError = 'Please use another email.';
    },
    userLogOut: (state, action) => initialState
  }
});

export const {
  userLogin,
  userLogInSuccess,
  userLogInFailed,
  userLogOut,
  registerUserSuccess,
  registerUserFailed
} = userSlice.actions;

export default userSlice.reducer;

export const loginUser = (user) =>
  apiCallBegan({
    url: '/login',
    method: 'post',
    data: user,
    onStart: userLogin.type,
    onSuccess: userLogInSuccess.type,
    onError: userLogInFailed.type
  });

export const registerUser = (user) =>
  apiCallBegan({
    url: '/register',
    method: 'post',
    data: user,
    onStart: userLogin.type,
    onSuccess: registerUserSuccess.type,
    onError: registerUserFailed.type
  });
