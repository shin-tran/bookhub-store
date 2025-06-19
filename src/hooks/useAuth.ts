import { useEffect } from "react";
import { useGetUser } from "./useUsers";
import { useAuthStore } from "@stores/authStore";

export const useAuth = () => {
  const { data: user, isSuccess, isLoading, isError } = useGetUser();
  const { isAuthenticated, setIsAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    if (isSuccess && user && !isError) {
      setIsAuthenticated(true);
    }
  }, [isSuccess, user, isError, setIsAuthenticated]);

  const isUserLoading = isAuthenticated && isLoading && !isError;

  return {
    user,
    isAuthenticated,
    isUserLoading,
    isError,
    logout,
  };
};
