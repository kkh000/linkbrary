import axios from 'axios';
import { getAccessToken } from './token';

const accessToken = getAccessToken();
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
  },
});

export default instance;
