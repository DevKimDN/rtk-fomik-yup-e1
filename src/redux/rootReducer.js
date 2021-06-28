import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from './slices/loginSlice';

export default combineReducers({
  login: loginReducer
});
