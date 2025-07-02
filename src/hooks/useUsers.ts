import type { UserList, UserUpdate } from "@/types/api";
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

// Helper function to invalidate user queries
const useUserQueryInvalidation = () => {
  const queryClient = useQueryClient();

  return {
    invalidateCurrentUser: () =>
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.current() }),

    refetchPaginations: () =>
      queryClient.refetchQueries({ queryKey: USER_QUERY_KEYS.paginations() }),

    invalidateAll: () =>
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.all }),
  };
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
  const { invalidateCurrentUser } = useUserQueryInvalidation();

  return useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => userService.loginUser(username, password),
    onSuccess: invalidateCurrentUser,
    onError(error) {
      console.log("error", error);
    },
  });
};

export const useSignupUser = () => {
  const { invalidateCurrentUser } = useUserQueryInvalidation();

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
        invalidateCurrentUser();
      }
    },
    onError(error) {
      console.log("error", error);
    },
  });
};

export const useCreateUser = () => {
  const { refetchPaginations } = useUserQueryInvalidation();

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
    onSuccess: refetchPaginations,
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
  const { refetchPaginations } = useUserQueryInvalidation();

  return useMutation({
    mutationFn: refetchPaginations,
  });
};

export const useCreateUserList = () => {
  const { refetchPaginations } = useUserQueryInvalidation();

  return useMutation({
    mutationFn: async (userList: UserList[]) =>
      userService.createUserList(userList),
    onSuccess: refetchPaginations,
  });
};

export const useUpdateUser = () => {
  const { refetchPaginations } = useUserQueryInvalidation();

  return useMutation({
    mutationFn: async (user: UserUpdate) => userService.updateUser(user),
    onSuccess: refetchPaginations,
  });
};

export const useDeleteUser = () => {
  const { refetchPaginations } = useUserQueryInvalidation();

  return useMutation({
    mutationFn: async (id: string) => userService.deleteUser(id),
    onSuccess: refetchPaginations,
  });
};
