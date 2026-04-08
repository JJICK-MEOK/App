import { create } from 'zustand';
import { tokenStorage } from '@/src/lib/secureStore';

interface AuthState {
  user: null | {
    id: number;
    name: string;
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
    await tokenStorage.clearAll();
    set({ user: null, accessToken: null });
  },

  initAuth: async () => {
    const token = await tokenStorage.getAccessToken();
    if (token) set({ accessToken: token });
  },
}));
