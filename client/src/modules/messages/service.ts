import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export interface Message {
  _id: string;
  threadId: string;
  senderId: string;
  text: string;
  createdAt: string;
}

export const fetchMessages = createAsyncThunk<Message[], { threadId: string }>(
  'messages/fetchMessages',
  async ({ threadId }) => {
    const response = await axios.get<Message[]>(
      `/threads/${threadId}/messages`,
    );
    return response.data;
  },
);
