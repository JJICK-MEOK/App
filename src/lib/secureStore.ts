import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  REGISTRATION_STATUS: 'registrationStatus',
} as const;

const setItem = (key: string, value: string): Promise<void> => {
  if (Platform.OS === 'web') {
    localStorage.setItem(key, value);
    return Promise.resolve();
  }
  return SecureStore.setItemAsync(key, value);
};

const getItem = (key: string): Promise<string | null> => {
  if (Platform.OS === 'web') {
    return Promise.resolve(localStorage.getItem(key));
  }
  return SecureStore.getItemAsync(key);
};

const deleteItem = (key: string): Promise<void> => {
  if (Platform.OS === 'web') {
    localStorage.removeItem(key);
    return Promise.resolve();
  }
  return SecureStore.deleteItemAsync(key);
};

export const tokenStorage = {
  saveAccessToken: (token: string) => setItem(KEYS.ACCESS_TOKEN, token),
  getAccessToken: () => getItem(KEYS.ACCESS_TOKEN),
  deleteAccessToken: () => deleteItem(KEYS.ACCESS_TOKEN),

  saveRefreshToken: (token: string) => setItem(KEYS.REFRESH_TOKEN, token),
  getRefreshToken: () => getItem(KEYS.REFRESH_TOKEN),
  deleteRefreshToken: () => deleteItem(KEYS.REFRESH_TOKEN),

  saveRegistrationStatus: (status: string) => setItem(KEYS.REGISTRATION_STATUS, status),
  getRegistrationStatus: () => getItem(KEYS.REGISTRATION_STATUS),
  deleteRegistrationStatus: () => deleteItem(KEYS.REGISTRATION_STATUS),

  clearAll: () =>
    Promise.all([
      deleteItem(KEYS.ACCESS_TOKEN),
      deleteItem(KEYS.REFRESH_TOKEN),
      deleteItem(KEYS.REGISTRATION_STATUS),
    ]),
};
