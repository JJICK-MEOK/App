import axios from 'axios';
import { useAuthStore } from '@/src/store/authStore';
import { tokenStorage } from '@/src/lib/secureStore';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

if (!API_BASE_URL) {
  if (__DEV__) {
    console.warn('Missing EXPO_PUBLIC_API_URL — API calls will fail in dev mode');
  } else {
    throw new Error('Missing EXPO_PUBLIC_API_URL');
  }
}

export const api = axios.create({
  baseURL: API_BASE_URL,
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

// reissue 응답의 refresh token은 매번 새 값으로 교체되는 rotation 방식이라 반드시 덮어써야 한다.
export async function reissueTokens(refreshToken: string): Promise<string> {
  const { data } = await axios.post(`${API_BASE_URL}/auth/reissue`, { refreshToken });
  const { accessToken, refreshToken: newRefreshToken } = data.data;
  await Promise.all([
    tokenStorage.saveAccessToken(accessToken),
    tokenStorage.saveRefreshToken(newRefreshToken),
  ]);
  return accessToken;
}

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = (async () => {
          try {
            const refreshToken = await tokenStorage.getRefreshToken();
            if (!refreshToken) throw new Error('No refresh token');

            const newAccessToken = await reissueTokens(refreshToken);
            useAuthStore.getState().setToken(newAccessToken);
            return newAccessToken;
          } finally {
            isRefreshing = false;
            refreshPromise = null;
          }
        })();
      }

      try {
        const newAccessToken = await refreshPromise!;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch {
        await useAuthStore.getState().logout();
      }
    }

    return Promise.reject(error);
  },
);
