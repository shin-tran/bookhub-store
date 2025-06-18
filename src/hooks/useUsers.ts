import { userService } from "@services/userService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

// Query keys
export const USER_QUERY_KEYS = {
  all: ["user"] as const,
  current: () => [...USER_QUERY_KEYS.all, "current"] as const,
};

export const useGetUser = () => {
  return useQuery({
    queryKey: USER_QUERY_KEYS.current(),
    queryFn: userService.getUser,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!localStorage.getItem("isAuthenticated"),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 1,
  });
};

export const useLoginUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => userService.loginUser(username, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.current() });
    },
    onError(error) {
      console.log("error", error);
    },
  });
};

export const useSignupUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      fullName,
      email,
      password,
      phone,
    }: {
      fullName: string;
      email: string;
      password: string;
      phone: string;
    }) => userService.signupUser(fullName, email, password, phone),
    onSuccess(data) {
      console.log("data", data);
      if (localStorage.getItem("isAuthenticated")) {
        queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.current() });
      }
    },
    onError(error) {
      console.log("error", error);
    },
  });
};

export const useRefetchUser = () => {
  const queryClient = useQueryClient();

  const refetchUser = useCallback(() => {
    return queryClient.invalidateQueries({
      queryKey: USER_QUERY_KEYS.current(),
    });
  }, [queryClient]);

  return { refetchUser };
};
