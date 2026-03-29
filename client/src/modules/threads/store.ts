import { createSlice } from '@reduxjs/toolkit';

import { LoadingState } from 'store/constants';
import { sharedPendingReducer, sharedRejectedReducer, GenericPayloadAction } from 'store/utils';

import { Thread, fetchThreads } from './service';

interface ThreadsState {
  loading: LoadingState;
  error: string | null;
  threads: Thread[];
}

const initialState: ThreadsState = {
  loading: LoadingState.Idle,
  error: null,
  threads: [],
};

const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreads.pending, sharedPendingReducer)
      .addCase(fetchThreads.fulfilled, (state, action) => {
        state.loading = LoadingState.Idle;
        state.error = null;
        state.threads = action.payload;
      })
      .addCase(fetchThreads.rejected, sharedRejectedReducer as (state: ThreadsState, action: GenericPayloadAction) => void);
  },
});

export default threadsSlice;
