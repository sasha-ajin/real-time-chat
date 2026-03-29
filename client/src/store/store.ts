import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import authSlice from 'modules/auth/store';
import threadsSlice from 'modules/threads/store';
import messagesSlice from 'modules/messages/store';

export function createStore() {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
      threads: threadsSlice.reducer,
      messages: messagesSlice.reducer,
    },
    devTools: process.env.NODE_ENV === 'development',
  });
}

export type RootStore = ReturnType<typeof createStore>;
export type RootState = ReturnType<RootStore['getState']>;
export type AppDispatch = RootStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
