import { create } from 'zustand';
import { tokenStorage } from '@/src/lib/secureStore';

interface AuthState {
  user: null | {
    id: number;
    email: string;
    profileCompleted: boolean;
  };
  accessToken: string | null;

  setUser: (user: AuthState['user']) => void;
  setToken: (token: string | null) => void;
  logout: () => Promise<void>;
  initAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,

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
      set({ accessToken: token ?? null });
    } catch {
      set({ accessToken: null });
    }
  },
}));
