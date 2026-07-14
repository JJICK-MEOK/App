import { create } from 'zustand';
import { tokenStorage } from '@/src/lib/secureStore';
import { postLogout } from '@/src/api/auth';
import { reissueTokens } from '@/src/lib/api';
import { isJwtExpired } from '@/src/lib/jwt';

export type RegistrationStatus = 'NOT_STARTED' | 'PROFILE_COMPLETED' | 'ONBOARDING_COMPLETED';

interface AuthState {
  accessToken: string | null;
  registrationStatus: RegistrationStatus | null;

  setToken: (token: string | null) => void;
  setRegistrationStatus: (status: RegistrationStatus) => void;
  logout: () => Promise<void>;
  initAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  registrationStatus: null,

  setToken: (token) => set({ accessToken: token }),
  setRegistrationStatus: (status) => {
    tokenStorage.saveRegistrationStatus(status);
    set({ registrationStatus: status });
  },

  logout: async () => {
    try {
      await postLogout();
    } catch {
      // 서버 로그아웃 실패는 무시
    }
    try {
      await tokenStorage.clearAll();
    } finally {
      set({ accessToken: null, registrationStatus: null });
    }
  },

  initAuth: async () => {
    const [accessToken, refreshToken, cachedStatus] = await Promise.all([
      tokenStorage.getAccessToken(),
      tokenStorage.getRefreshToken(),
      tokenStorage.getRegistrationStatus(),
    ]);
    const registrationStatus = (cachedStatus as RegistrationStatus | null) ?? null;

    if (!refreshToken) {
      set({ accessToken: null, registrationStatus: null });
      return;
    }

    if (accessToken && !isJwtExpired(accessToken)) {
      set({ accessToken, registrationStatus });
      return;
    }

    try {
      const newAccessToken = await reissueTokens(refreshToken);
      set({ accessToken: newAccessToken, registrationStatus });
    } catch {
      await tokenStorage.clearAll();
      set({ accessToken: null, registrationStatus: null });
    }
  },
}));
