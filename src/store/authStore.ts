import { create } from 'zustand';
import { tokenStorage } from '@/src/lib/secureStore';

interface AuthState {
  user: null | {
    id: number;
    name: string;
  };
  accessToken: string | null;
  isInitialized: boolean;

  setUser: (user: AuthState['user']) => void;
  setToken: (token: string | null) => void;
  logout: () => Promise<void>;
  initAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isInitialized: false,

  setUser: (user) => set({ user }),
  setToken: (token) => set({ accessToken: token }),

  logout: async () => {
    try {
      await tokenStorage.clearAll();
    } finally {
      set({ user: null, accessToken: null });
    }
  },

  initAuth: async () => {
    try {
      const token = await tokenStorage.getAccessToken();
      set({ accessToken: token ?? null, isInitialized: true });
    } catch {
      set({ accessToken: null, isInitialized: true });
    }
  },
}));
