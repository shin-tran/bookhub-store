import type { CreateBookPayload, UpdateBookPayload } from "@/types/api";
import { bookService } from "@services/bookService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const BOOK_QUERY_KEYS = {
  all: ["book"] as const,

  current: () => [...BOOK_QUERY_KEYS.all, "current"] as const,

  paginations: () => [...BOOK_QUERY_KEYS.all, "pagination"] as const,
  pagination: (
    current: number,
    pageSize: number,
    mainText?: string,
    author?: string,
    sortBy?: string,
  ) =>
    [
      ...BOOK_QUERY_KEYS.paginations(),
      current,
      pageSize,
      mainText,
      author,
      sortBy,
    ] as const,
};

const useBookQueryInvalidation = () => {
  const queryClient = useQueryClient();
  return {
    invalidateCurrentUser: () =>
      queryClient.invalidateQueries({ queryKey: BOOK_QUERY_KEYS.current() }),
    refetchPaginations: () =>
      queryClient.refetchQueries({ queryKey: BOOK_QUERY_KEYS.paginations() }),
    invalidateAll: () =>
      queryClient.invalidateQueries({ queryKey: BOOK_QUERY_KEYS.all }),
  };
};

export const useGetBookPaginations = (
  current: number,
  pageSize: number,
  mainText?: string,
  author?: string,
  sortBy?: string,
) => {
  return useQuery({
    queryKey: BOOK_QUERY_KEYS.pagination(
      current,
      pageSize,
      mainText,
      author,
      sortBy,
    ),
    queryFn: () =>
      bookService.getPaginations(current, pageSize, mainText, author, sortBy),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};

export const useCreateBook = () => {
  const { refetchPaginations } = useBookQueryInvalidation();
  return useMutation({
    mutationFn: (payload: CreateBookPayload) => bookService.createBook(payload),
    onSuccess: refetchPaginations,
  });
};

export const useReloadPaginations = () => {
  const { refetchPaginations } = useBookQueryInvalidation();
  return useMutation({
    mutationFn: refetchPaginations,
  });
};

export const useUpdateBook = () => {
  const { refetchPaginations } = useBookQueryInvalidation();
  return useMutation({
    mutationFn: async (book: UpdateBookPayload) => bookService.updateBook(book),
    onSuccess: refetchPaginations
  })
}