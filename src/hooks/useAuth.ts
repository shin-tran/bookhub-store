import { useEffect, useCallback } from "react";
import { useGetUser } from "./useUsers";
import { useAuthStore } from "@stores/authStore";
import type { User } from "@services/userService";

export const useAuth = () => {
  const { data: user, isSuccess, isLoading, isError } = useGetUser();
  const { setUser, clearUser, isAuthenticated, logout } = useAuthStore();

  const handleSetUser = useCallback(
    (userData: User) => {
      setUser(userData);
    },
    [setUser],
  );

  const handleClearUser = useCallback(() => {
    clearUser();
  }, [clearUser]);

  useEffect(() => {
    if (isSuccess && user && !isError) {
      handleSetUser(user);
    } else if (isError && isAuthenticated) {
      handleClearUser();
    }
  }, [
    isSuccess,
    user,
    isError,
    isAuthenticated,
    handleSetUser,
    handleClearUser,
  ]);

  const isUserLoading = isAuthenticated && isLoading && !isError;

  return {
    user,
    isAuthenticated,
    isUserLoading,
    isError,
    logout,
  };
};
