import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { bookService, type Book } from "@services/bookService";
import type { ApiResult } from "@cusTypes/api";

// Query Keys
export const BOOK_QUERY_KEYS = {
  all: ["books"] as const,
  lists: () => [...BOOK_QUERY_KEYS.all, "list"] as const,
  list: (filters: string) => [...BOOK_QUERY_KEYS.lists(), { filters }] as const,
  details: () => [...BOOK_QUERY_KEYS.all, "detail"] as const,
  detail: (id: string) => [...BOOK_QUERY_KEYS.details(), id] as const,
  search: (query: string) => [...BOOK_QUERY_KEYS.all, "search", query] as const,
};

// Hooks for Books

// Get all books
export const useBooks = () => {
  return useQuery({
    queryKey: BOOK_QUERY_KEYS.lists(),
    queryFn: bookService.getBooks,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get book by ID
export const useBook = (id: string) => {
  return useQuery({
    queryKey: BOOK_QUERY_KEYS.detail(id),
    queryFn: () => bookService.getBookById(id),
    enabled: !!id, // Only run if id exists
  });
};

// Search books
export const useSearchBooks = (query: string) => {
  return useQuery({
    queryKey: BOOK_QUERY_KEYS.search(query),
    queryFn: () => bookService.searchBooks(query),
    enabled: !!query && query.length > 2, // Only search if query is meaningful
    staleTime: 30 * 1000, // 30 seconds
  });
};

// Create book mutation
export const useCreateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookService.createBook,
    onSuccess: () => {
      // Invalidate and refetch books list
      queryClient.invalidateQueries({ queryKey: BOOK_QUERY_KEYS.lists() });
      console.log("Sách đã được tạo thành công!");
    },
    onError: (error: ApiResult<Book>) => {
      console.error("Lỗi khi tạo sách:", error.data || "Lỗi khi tạo sách");
    },
  });
};

// Update book mutation
export const useUpdateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookService.updateBook,
    onSuccess: (data, variables) => {
      // Update the specific book in cache
      queryClient.setQueryData(BOOK_QUERY_KEYS.detail(variables.id), data);
      // Invalidate books list to ensure consistency
      queryClient.invalidateQueries({ queryKey: BOOK_QUERY_KEYS.lists() });
      console.log("Sách đã được cập nhật thành công!");
    },
    onError: (error: ApiResult<Book>) => {
      console.error("Lỗi khi cập nhật sách:", error.data || "Lỗi khi cập nhật sách");
    },
  });
};

// Delete book mutation
export const useDeleteBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookService.deleteBook,
    onSuccess: (_, deletedId) => {
      // Remove book from cache
      queryClient.removeQueries({ queryKey: BOOK_QUERY_KEYS.detail(deletedId) });
      // Invalidate books list
      queryClient.invalidateQueries({ queryKey: BOOK_QUERY_KEYS.lists() });
      console.log("Sách đã được xóa thành công!");
    },
    onError: (error: ApiResult<Book>) => {
      console.error("Lỗi khi xóa sách:", error.data|| "Lỗi khi xóa sách");
    },
  });
};

// Optimistic update example for book update
export const useOptimisticUpdateBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bookService.updateBook,
    onMutate: async (updatedBook) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: BOOK_QUERY_KEYS.detail(updatedBook.id) });

      // Snapshot the previous value
      const previousBook = queryClient.getQueryData(BOOK_QUERY_KEYS.detail(updatedBook.id));

      // Optimistically update to the new value
      queryClient.setQueryData(BOOK_QUERY_KEYS.detail(updatedBook.id), (old: Book) => ({
        ...old,
        ...updatedBook,
      }));

      // Return a context object with the snapshotted value
      return { previousBook };
    },
    onError: (_error, updatedBook, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      queryClient.setQueryData(BOOK_QUERY_KEYS.detail(updatedBook.id), context?.previousBook);
      console.error("Lỗi khi cập nhật sách");
    },
    onSettled: (_data, _error, variables) => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: BOOK_QUERY_KEYS.detail(variables.id) });
    },
  });
};
