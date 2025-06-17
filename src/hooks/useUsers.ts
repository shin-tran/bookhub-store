import { userService } from "@services/userService";
import { useQuery, useMutation } from "@tanstack/react-query";

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
    enabled: !!localStorage.getItem("isAuthenticated"),
  });
};

export const useLoginUser = () => {
  return useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => userService.loginUser(username, password),
    onSuccess(data) {
      console.log("data", data);
    },
    onError(error) {
      console.log("error", error);
    },
  });
};

export const useSignupUser = () => {
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
    },
    onError(error) {
      console.log("error", error);
    },
  });
};
