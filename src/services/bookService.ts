import instance from "./axiosCustomize";

// Types
export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  image: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookRequest {
  title: string;
  author: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface UpdateBookRequest extends Partial<CreateBookRequest> {
  id: string;
}

// API functions using Axios
export const bookService = {
  // Get all books
  getBooks: async (): Promise<Book[]> => {
    const response = await instance.get("/books");
    return response.data;
  },

  // Get book by ID
  getBookById: async (id: string): Promise<Book> => {
    const response = await instance.get(`/books/${id}`);
    return response.data;
  },

  // Create new book
  createBook: async (book: CreateBookRequest): Promise<Book> => {
    const response = await instance.post("/books", book);
    return response.data;
  },

  // Update book
  updateBook: async (book: UpdateBookRequest): Promise<Book> => {
    const response = await instance.put(`/books/${book.id}`, book);
    return response.data;
  },

  // Delete book
  deleteBook: async (id: string): Promise<void> => {
    await instance.delete(`/books/${id}`);
  },

  // Search books
  searchBooks: async (query: string): Promise<Book[]> => {
    const response = await instance.get(
      `/books/search?q=${encodeURIComponent(query)}`,
    );
    return response.data;
  },
};
