"use client";

import { create } from "zustand";

interface User {
  id: number;
  fullname: string;
  username: string;
  age: number;
  balance: number;
}

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: User | null;
  loginHandler: (data: { token: string; user: User }) => void;
  logoutHandler: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  isAuthenticated: Boolean(localStorage.getItem("token")),
  user: null,
  setUser: (user: User) => set({ user }),
  loginHandler: ({ token, user }) => {
    localStorage.setItem("token", token);
    set({ token, isAuthenticated: true, user });
  },
  logoutHandler: () => {
    localStorage.removeItem("token");
    set({ token: null, isAuthenticated: false });
  },
}));
