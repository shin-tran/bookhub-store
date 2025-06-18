import { useEffect, useCallback } from "react";
import { useGetUser } from "./useUsers";
import { useAuthStore } from "@stores/authStore";
import type { User } from "@services/userService";

export const useAuth = () => {
  const { data: user, isSuccess, isLoading, isError } = useGetUser();
  const { setUser, isAuthenticated, logout } = useAuthStore();

  const handleSetUser = useCallback(
    (userData: User) => {
      setUser(userData);
    },
    [setUser],
  );

  useEffect(() => {
    if (isSuccess && user && !isError) {
      handleSetUser(user);
    }
  }, [isSuccess, user, isError, handleSetUser]);

  const isUserLoading = isAuthenticated && isLoading && !isError;

  return {
    user,
    isAuthenticated,
    isUserLoading,
    isError,
    logout,
  };
};
