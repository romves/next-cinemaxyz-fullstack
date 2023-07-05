import { getCookie } from 'cookies-next';
import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  loginHandler: () => void;
  logoutHandler: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: Boolean(getCookie('logged-in')),
  loginHandler: () => {
    set({isAuthenticated: true });
  },
  logoutHandler: () => {
    set({isAuthenticated: false });
  },
}));
