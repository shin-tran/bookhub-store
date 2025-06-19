// Base interfaces
export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  avatar: string;
}

export interface UserDetail extends User {
  _id: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// API Response types
export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface SignupResponse {
  _id: string;
  email: string;
  fullName: string;
}

// Generic API wrapper
export interface ApiResult<T> {
  error?: string | string[];
  message: string;
  statusCode: string | number;
  data?: T;
}

export interface PaginatedResponse<T> {
  meta: {
    current: string;
    pageSize: string;
    pages: number;
    total: number;
  };
  result: T[];
}

// Specific response types
export type UsersPaginatedResponse = PaginatedResponse<UserDetail>;
