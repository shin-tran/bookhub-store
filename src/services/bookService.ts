import type {
  BooksPaginatedResponse,
  CategoryResponse,
  CreateBookPayload,
  CreateBookResponse,
  DeleteBookResponse,
  UpdateBookPayload,
  UpdateBookResponse,
} from "@/types/api";
import instance from "./axiosCustomize";

export const bookService = {
  getPaginations: async (
    current: number,
    pageSize: number,
    mainText?: string,
    author?: string,
    sortBy?: string,
  ): Promise<BooksPaginatedResponse> => {
    const queryParams = [
      `current=${current}`,
      `pageSize=${pageSize}`,
      mainText && mainText.trim() ? `mainText=/${mainText}/i` : "",
      author && author.trim() ? `author=/${author}/i` : "",
      sortBy ? `sort=${sortBy}` : "",
    ]
      .filter(Boolean)
      .join("&");

    const response = await instance.get(`/api/v1/book?${queryParams}`);
    return response.data.data;
  },

  getCategory: async (): Promise<CategoryResponse> => {
    const response = await instance.get("/api/v1/database/category");
    return response.data;
  },

  createBook: async (
    payload: CreateBookPayload,
  ): Promise<CreateBookResponse> => {
    const response = await instance.post("/api/v1/book", payload);
    return response.data;
  },

  updateBook: async (
    payload: UpdateBookPayload,
  ): Promise<UpdateBookResponse> => {
    const response = await instance.put(`/api/v1/book`, payload);
    return response.data;
  },

  deleteBook: async (id: string): Promise<DeleteBookResponse> => {
    const response = await instance.delete(`/api/v1/book/${id}`);
    return response.data;
  },
};
