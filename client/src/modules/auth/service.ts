import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const SIGN_UP_ENDPOINT = '/auth/register';
export const SIGN_IN_ENDPOINT = '/auth/login';
export const SIGN_OUT_ENDPOINT = '/auth/logout';

export interface SignUpRequest {
  username: string;
  email: string;
  password: string;
}

export interface SignInRequest {
  username: string;
  password: string;
}

export interface AuthTokenResponse {
  access_token: string;
  username: string
}

export const signUp = createAsyncThunk('auth/signUp', async (payload: SignUpRequest) => {
  const response = await axios.post<AuthTokenResponse>(SIGN_UP_ENDPOINT, payload);
  return response.data;
});

export const signIn = createAsyncThunk('auth/signIn', async (payload: SignInRequest) => {
  const response = await axios.post<AuthTokenResponse>(SIGN_IN_ENDPOINT, payload);
  return response.data;
});

export const signOut = createAsyncThunk('auth/signOut', async () => {
  const response = await axios.post(SIGN_OUT_ENDPOINT);
  return response.data;
});
