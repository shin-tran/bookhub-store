// Base interfaces
export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  avatar: string;
}

export type UserDetail = Omit<User, "id"> & {
  _id: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export interface UserList {
  fullName: string;
  email: string;
  password: string;
  phone: string;
}

export interface UserUpdate {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
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

export interface BulkCreateResponse {
  countSuccess?: number;
  countError: number | null;
  message?: string | null;
  detail?: {
    insertedCount: number;
    insertedIds: object;
  };
}

export interface UpdateUserResponse {
  acknowledged: boolean;
  modifiedCount: number;
  upsertedId: null;
  upsertedCount: number;
  matchedCount: number;
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
