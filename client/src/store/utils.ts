import { PayloadAction, SerializedError } from '@reduxjs/toolkit';

import { LoadingState } from 'store/constants';

export interface BaseSliceState {
  loading: LoadingState;
  error?: string | null;
}

export type GenericPayloadAction = PayloadAction<
  unknown,
  string,
  {
    arg: number | void | unknown;
    requestId: string;
    aborted: boolean;
    condition: boolean;
  },
  SerializedError
>;

export function sharedPendingReducer<T extends BaseSliceState>(state: T) {
  if (state.loading === LoadingState.Idle) {
    state.loading = LoadingState.Pending;
  }
}

export function sharedRejectedReducer<T extends BaseSliceState>(state: T, action: GenericPayloadAction) {
  if (state.loading === LoadingState.Pending) {
    state.loading = LoadingState.Idle;
    state.error = action.error.message;
  }
}
