import type {
  ApiResult,
  BulkCreateResponse,
  DeleteUser,
  LoginResponse,
  SignupResponse,
  UpdateUserResponse,
  User,
  UserDetail,
  UserList,
  UsersPaginatedResponse,
  UserUpdate,
} from "@/types/api";
import instance from "./axiosCustomize";

// API functions using Axios
export const userService = {
  getUser: async (): Promise<User> => {
    const response = await instance.get("/api/v1/auth/account");
    return response.data.data.user;
  },

  getPaginations: async (
    current: number,
    pageSize: number,
    fullName?: string,
    email?: string,
    dateRange?: { startDate?: string; endDate?: string },
    sortBy?: string,
  ): Promise<UsersPaginatedResponse> => {
    const queryParams = [
      `current=${current}`,
      `pageSize=${pageSize}`,
      fullName && fullName.trim() ? `fullName=/${fullName}/i` : "",
      email && email.trim() ? `email=/${email}/i` : "",
      dateRange?.startDate ? `createdAt>=${dateRange.startDate}` : "",
      dateRange?.endDate ? `createdAt<=${dateRange.endDate}` : "",
      sortBy ? `sort=${sortBy}` : "",
    ]
      .filter(Boolean)
      .join("&");

    const response = await instance.get(`/api/v1/user?${queryParams}`);
    return response.data.data;
  },

  loginUser: async (
    username: string,
    password: string,
  ): Promise<ApiResult<LoginResponse>> => {
    const response = await instance.post("/api/v1/auth/login", {
      username,
      password,
    });
    return response.data;
  },

  signupUser: async (
    fullName: string,
    email: string,
    password: string,
    phone: string,
  ): Promise<ApiResult<SignupResponse>> => {
    const response = await instance.post("/api/v1/user/register", {
      fullName,
      email,
      password,
      phone,
    });
    return response.data;
  },

  logoutUser: async (): Promise<string> => {
    const response = await instance.post("/api/v1/auth/logout");
    return response.data;
  },

  createUser: async (
    fullName: string,
    email: string,
    password: string,
    phone: string,
  ): Promise<ApiResult<UserDetail>> => {
    const response = await instance.post("/api/v1/user", {
      fullName,
      email,
      password,
      phone,
    });
    return response.data;
  },

  createUserList: async (
    userList: UserList[],
  ): Promise<ApiResult<BulkCreateResponse>> => {
    const response = await instance.post("/api/v1/user/bulk-create", userList);
    return response.data;
  },

  updateUser: async (
    user: UserUpdate,
  ): Promise<ApiResult<UpdateUserResponse>> => {
    const response = await instance.put("/api/v1/user", user);
    return response.data;
  },

  deleteUser: async (id: string): Promise<ApiResult<DeleteUser>> => {
    const response = await instance.delete(`/api/v1/user/${id}`);
    return response.data;
  },
};
