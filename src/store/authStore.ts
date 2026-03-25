import { create } from 'zustand';

interface AuthState {
  user: null | {
    id: number;
    name: string;
  };
  accessToken: string | null;

  setUser: (user: AuthState['user']) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,

  setUser: (user) => set({ user }),
  setToken: (token) => set({ accessToken: token }),

  logout: () =>
    set({
      user: null,
      accessToken: null,
    }),
}));
