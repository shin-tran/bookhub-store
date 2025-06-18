import type { User } from "@services/userService";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isAuthenticated: !!localStorage.getItem("isAuthenticated"),
  setUser: (user) => {
    set({ user, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("isAuthenticated");
    set({ user: null, isAuthenticated: false });
  },
}));
