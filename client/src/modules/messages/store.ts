import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { LoadingState } from 'store/constants';
import { sharedRejectedReducer, GenericPayloadAction } from 'store/utils';

import { Message, fetchMessages } from './service';

interface MessagesState {
  loading: LoadingState;
  error: string | null;
  messages: Message[];
}

const initialState: MessagesState = {
  loading: LoadingState.Idle,
  error: null,
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<Message>) {
      const exists = state.messages.some((m) => m._id === action.payload._id);
      if (!exists) {
        state.messages.push(action.payload);
      }
    },
    clearMessages(state) {
      state.messages = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = LoadingState.Pending;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = LoadingState.Idle;
        state.error = null;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, sharedRejectedReducer as (state: MessagesState, action: GenericPayloadAction) => void);
  },
});

export default messagesSlice;
