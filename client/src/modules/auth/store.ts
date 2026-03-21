import { createSlice } from '@reduxjs/toolkit';

import { LoadingState } from 'store/constants';
import { sharedPendingReducer, sharedRejectedReducer, GenericPayloadAction } from 'store/utils';

import { AuthTokenResponse, signIn, signOut, signUp } from './service';

const ACCESS_TOKEN_KEY = 'access_token';
const USERNAME_KEY = 'username';

interface AuthState {
  loading: LoadingState;
  error: string | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  username: string | null;
}

export function createInitialState(): AuthState {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const username = localStorage.getItem(USERNAME_KEY);

  return {
    loading: LoadingState.Idle,
    error: null,
    isAuthenticated: !!accessToken,
    accessToken,
    username,
  };
}

function handleAuthFulfilled(state: AuthState, action: { payload: AuthTokenResponse }) {
  state.loading = LoadingState.Idle;
  state.error = null;
  state.isAuthenticated = true;
  state.accessToken = action.payload.access_token;
  state.username = action.payload.username;
  localStorage.setItem(ACCESS_TOKEN_KEY, action.payload.access_token);
  localStorage.setItem(USERNAME_KEY, action.payload.username);
}

function resetState(state: AuthState) {
  state.loading = LoadingState.Idle;
  state.error = null;
  state.isAuthenticated = false;
  state.accessToken = null;
  state.username = null;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(USERNAME_KEY);
}

const authSlice = createSlice({
  name: 'auth',
  initialState: createInitialState(),
  reducers: {
    resetAuthentication(state) {
      resetState(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, sharedPendingReducer)
      .addCase(signUp.fulfilled, handleAuthFulfilled)
      .addCase(signUp.rejected, sharedRejectedReducer as (state: AuthState, action: GenericPayloadAction) => void)

      .addCase(signIn.pending, sharedPendingReducer)
      .addCase(signIn.fulfilled, handleAuthFulfilled)
      .addCase(signIn.rejected, sharedRejectedReducer as (state: AuthState, action: GenericPayloadAction) => void)

      .addCase(signOut.pending, sharedPendingReducer)
      .addCase(signOut.fulfilled, resetState)
      .addCase(signOut.rejected, sharedRejectedReducer as (state: AuthState, action: GenericPayloadAction) => void);
  },
});

export default authSlice;
