import axios from 'axios';

const SEARCH_USERS_ENDPOINT = '/users';

export interface UserResult {
  username: string;
  email: string;
}

export async function searchUsers(userName: string): Promise<UserResult[]> {
  const response = await axios.get<UserResult[]>(SEARCH_USERS_ENDPOINT, {
    params: { userName },
  });
  return response.data;
}
