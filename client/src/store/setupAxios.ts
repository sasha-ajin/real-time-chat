import { AxiosInstance, AxiosError } from 'axios';

import authSlice from 'modules/auth/store';

import { AppDispatch, RootState } from './store';

export function setupAxios(
  axios: AxiosInstance,
  dispatch: AppDispatch,
  getState: () => RootState,
) {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

  axios.interceptors.request.use(
    (config) => {
      const { accessToken } = getState().auth;
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  axios.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error?.response?.status === 401) {
        dispatch(authSlice.actions.resetAuthentication());
      }
      return Promise.reject(error);
    },
  );
}
