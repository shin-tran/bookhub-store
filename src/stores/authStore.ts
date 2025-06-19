import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  setIsAuthenticated: (v: boolean, access_token?: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  isAuthenticated: !!localStorage.getItem("isAuthenticated"),
  setIsAuthenticated: (value, access_token) => {
    if (value) {
      localStorage.setItem("isAuthenticated", "true");
      if (access_token) localStorage.setItem("access_token", access_token);
    } else {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("access_token");
    }
    set({ isAuthenticated: value });
  },
  logout: () => {
    useAuthStore.getState().setIsAuthenticated(false);
  },
}));
