import { userService } from "@services/userService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const USER_QUERY_KEYS = {
  // Base key
  all: ["user"] as const,
  // Current user
  current: () => [...USER_QUERY_KEYS.all, "current"] as const,
  // Pagination
  paginations: () => [...USER_QUERY_KEYS.all, "pagination"] as const,
  pagination: (
    current: number,
    pageSize: number,
    fullName?: string,
    email?: string,
    dateRange?: { startDate?: string; endDate?: string },
    sortBy?: string,
  ) =>
    [
      ...USER_QUERY_KEYS.paginations(),
      current,
      pageSize,
      fullName,
      email,
      dateRange,
      sortBy,
    ] as const,
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

export const useGetPaginations = (
  current: number,
  pageSize: number,
  fullName?: string,
  email?: string,
  dateRange?: { startDate?: string; endDate?: string },
  sortBy?: string,
) => {
  return useQuery({
    queryKey: USER_QUERY_KEYS.pagination(
      current,
      pageSize,
      fullName,
      email,
      dateRange,
      sortBy,
    ),
    queryFn: () =>
      userService.getPaginations(
        current,
        pageSize,
        fullName,
        email,
        dateRange,
        sortBy,
      ),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
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
    onSuccess() {
      if (localStorage.getItem("isAuthenticated")) {
        queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.current() });
      }
    },
    onError(error) {
      console.log("error", error);
    },
  });
};

export const useCreateUser = () => {
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
    }) => userService.createUser(fullName, email, password, phone),
    onSuccess() {
      return queryClient.refetchQueries({
        queryKey: USER_QUERY_KEYS.paginations(),
      });
    },
    onError(error) {
      console.log("error", error);
    },
  });
};

export const useLogoutUser = () => {
  return useMutation({
    mutationFn: () => userService.logoutUser(),
  });
};

export const useReloadPaginations = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      return queryClient.refetchQueries({
        queryKey: USER_QUERY_KEYS.paginations(),
      });
    },
  });
};
