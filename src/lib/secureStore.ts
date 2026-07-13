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

  // 서버 reissue 응답엔 registrationStatus가 없어서, 로그인/프로필생성/온보딩완료 시점에
  // 받은 값을 로컬에 캐싱해뒀다가 앱 재시작 시 자동 로그인 라우팅에 사용한다.
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
