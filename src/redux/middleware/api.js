import { createAction } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config";

export const apiCallBegan = createAction("api/callBegan");
export const apiCallSuccess = createAction("api/callSuccess");
export const apiCallFailed = createAction("api/callFailed");

const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== apiCallBegan.type) return next(action);

  const { url, method, data, onStart, onSuccess, onError } = action.payload;

  if (onStart) dispatch({ type: onStart });

  next(action);

  try {
    const response = await axios.request({
      baseURL: config.apiEndpoint,
      url,
      method,
      data
    });
    // General message to indicate a successful API call in Redux DevTools
    dispatch(apiCallSuccess({ data: response.data, status: response.status }));
    // Specific action to dispatch in slice after successful API call
    if (onSuccess)
      dispatch({
        type: onSuccess,
        payload: {
          data: response.data,
          headers: response.headers,
          status: response.status
        }
      });
  } catch (error) {
    // General error message for debugging in Redux RedTools
    dispatch(apiCallFailed(error.message));
    // Specific action to dispatch in slice after an un successful API call
    if (onError) dispatch({ type: onError, payload: error.message });
  }
};

export default api;
