import type { ApiResult } from "@cusTypes/api";
import instance from "./axiosCustomize";

export interface User {
  email: string;
  phone: string;
  fullName: string;
  role: string;
  avatar: string;
  id: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface SignupResponse {
  _id: string;
  email: string;
  fullName: string;
}

// API functions using Axios
export const userService = {
  getUsers: async (): Promise<User[]> => {
    const response = await instance.get("/api/v1/auth/account");
    return response.data;
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

  // Update book
  // Delete book
  // Search books
};
