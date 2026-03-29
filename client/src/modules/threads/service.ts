import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const THREADS_ENDPOINT = '/threads';

export interface ThreadParticipant {
  _id: string;
  username: string;
}

export interface ThreadLastMessage {
  text: string;
  senderId: string;
  createdAt: string;
}

export interface Thread {
  _id: string;
  participants: ThreadParticipant[];
  lastMessage: ThreadLastMessage | null;
  createdAt: string;
  updatedAt: string;
}

export const fetchThreads = createAsyncThunk<Thread[]>(
  'threads/fetchThreads',
  async () => {
    const response = await axios.get<Thread[]>(THREADS_ENDPOINT);
    return response.data;
  },
);

export async function createThread(participantId: string): Promise<Thread> {
  const response = await axios.post<Thread>(THREADS_ENDPOINT, { participantId });
  return response.data;
}
