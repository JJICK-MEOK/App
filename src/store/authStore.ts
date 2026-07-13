import { create } from 'zustand';
import { tokenStorage } from '@/src/lib/secureStore';
import { postLogout } from '@/src/api/auth';
import { reissueTokens } from '@/src/lib/api';
import { isJwtExpired } from '@/src/lib/jwt';

export type RegistrationStatus = 'NOT_STARTED' | 'PROFILE_COMPLETED' | 'ONBOARDING_COMPLETED';

interface AuthState {
  user: null | {
    id: number;
    email: string;
    profileCompleted: boolean;
  };
  accessToken: string | null;
  // reissue 응답엔 registrationStatus가 없어서, 로그인/프로필생성/온보딩완료 시점에
  // 받은 값을 캐싱해뒀다가 앱 재시작 시 라우팅에 쓴다. 이전 버전에서 저장된 세션 등
  // 캐시가 없는 경우엔 null.
  registrationStatus: RegistrationStatus | null;

  setUser: (user: AuthState['user']) => void;
  setToken: (token: string | null) => void;
  setRegistrationStatus: (status: RegistrationStatus) => void;
  logout: () => Promise<void>;
  initAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  registrationStatus: null,

  setUser: (user) => set({ user }),
  setToken: (token) => set({ accessToken: token }),
  setRegistrationStatus: (status) => {
    tokenStorage.saveRegistrationStatus(status);
    set({ registrationStatus: status });
  },

  logout: async () => {
    try {
      // 서버는 stateless JWT라 access token 자체는 만료 전까지 무효화되지 않는다.
      // refresh token만 Redis에서 지워지므로, 실패해도(만료된 토큰 등) 로컬 토큰 삭제는 항상 진행한다.
      await postLogout();
    } catch {
      // 서버 로그아웃 실패는 무시 — 아래에서 로컬 토큰은 어차피 지운다.
    }
    try {
      await tokenStorage.clearAll();
    } finally {
      set({ user: null, accessToken: null, registrationStatus: null });
    }
  },

  initAuth: async () => {
    const [accessToken, refreshToken, cachedStatus] = await Promise.all([
      tokenStorage.getAccessToken(),
      tokenStorage.getRefreshToken(),
      tokenStorage.getRegistrationStatus(),
    ]);
    const registrationStatus = (cachedStatus as RegistrationStatus | null) ?? null;

    // refresh token이 없으면 access token만으로는 세션을 이어갈 방법이 없다 → 로그인 필요.
    if (!refreshToken) {
      set({ accessToken: null, registrationStatus: null });
      return;
    }

    // access token이 아직 안 만료됐으면 네트워크 호출 없이 그대로 사용.
    if (accessToken && !isJwtExpired(accessToken)) {
      set({ accessToken, registrationStatus });
      return;
    }

    // 만료됐거나 없으면 refresh token으로 재발급 시도.
    try {
      const newAccessToken = await reissueTokens(refreshToken);
      set({ accessToken: newAccessToken, registrationStatus });
    } catch {
      // refresh token도 만료/무효 → 완전히 로그아웃 상태로 취급.
      await tokenStorage.clearAll();
      set({ accessToken: null, registrationStatus: null });
    }
  },
}));
