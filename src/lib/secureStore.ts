import * as SecureStore from 'expo-secure-store';

const KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
} as const;

export const tokenStorage = {
  saveAccessToken: (token: string) => SecureStore.setItemAsync(KEYS.ACCESS_TOKEN, token),
  getAccessToken: () => SecureStore.getItemAsync(KEYS.ACCESS_TOKEN),
  deleteAccessToken: () => SecureStore.deleteItemAsync(KEYS.ACCESS_TOKEN),

  saveRefreshToken: (token: string) => SecureStore.setItemAsync(KEYS.REFRESH_TOKEN, token),
  getRefreshToken: () => SecureStore.getItemAsync(KEYS.REFRESH_TOKEN),
  deleteRefreshToken: () => SecureStore.deleteItemAsync(KEYS.REFRESH_TOKEN),

  clearAll: () =>
    Promise.all([
      SecureStore.deleteItemAsync(KEYS.ACCESS_TOKEN),
      SecureStore.deleteItemAsync(KEYS.REFRESH_TOKEN),
    ]),
};
