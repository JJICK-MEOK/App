import axios from 'axios';
import { useAuthStore } from '@/src/store/authStore';

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL ?? '',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
