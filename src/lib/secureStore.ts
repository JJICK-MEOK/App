import * as SecureStore from 'expo-secure-store';

const KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  REGISTRATION_STATUS: 'registrationStatus',
} as const;

export const tokenStorage = {
  saveAccessToken: (token: string) => SecureStore.setItemAsync(KEYS.ACCESS_TOKEN, token),
  getAccessToken: () => SecureStore.getItemAsync(KEYS.ACCESS_TOKEN),
  deleteAccessToken: () => SecureStore.deleteItemAsync(KEYS.ACCESS_TOKEN),

  saveRefreshToken: (token: string) => SecureStore.setItemAsync(KEYS.REFRESH_TOKEN, token),
  getRefreshToken: () => SecureStore.getItemAsync(KEYS.REFRESH_TOKEN),
  deleteRefreshToken: () => SecureStore.deleteItemAsync(KEYS.REFRESH_TOKEN),

  saveRegistrationStatus: (status: string) =>
    SecureStore.setItemAsync(KEYS.REGISTRATION_STATUS, status),
  getRegistrationStatus: () => SecureStore.getItemAsync(KEYS.REGISTRATION_STATUS),
  deleteRegistrationStatus: () => SecureStore.deleteItemAsync(KEYS.REGISTRATION_STATUS),

  clearAll: () =>
    Promise.all([
      SecureStore.deleteItemAsync(KEYS.ACCESS_TOKEN),
      SecureStore.deleteItemAsync(KEYS.REFRESH_TOKEN),
      SecureStore.deleteItemAsync(KEYS.REGISTRATION_STATUS),
    ]),
};
