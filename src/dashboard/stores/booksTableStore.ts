import { INITIAL_VISIBLE_BOOKS_COLUMNS } from "@dashboard/constants/dashboardContansts";
import type { Selection, SortDescriptor } from "@heroui/react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface SearchFilters {
  mainText: string;
  author: string;
  sortBy?: string;
}

interface BooksTableState {
  currPage: number;
  pageSize: number;
  sortDescriptor: SortDescriptor;
  searchFilters: SearchFilters;
  visibleColumns: Selection;

  // Actions
  setCurrPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setSortDescriptor: (descriptor: SortDescriptor) => void;
  setSearchFilters: (
    filters: SearchFilters | ((prev: SearchFilters) => SearchFilters),
  ) => void;
  setVisibleColumns: (columns: Selection) => void;
  resetFilters: () => void;
  handlePageSizeChange: (newPageSize: number) => void;
}

const initialSearchFilters: SearchFilters = {
  mainText: "",
  author: "",
  sortBy: "createdAt",
};

const useBooksTableStore = create<BooksTableState>()(
  devtools(
    (set) => ({
      // Initial state
      currPage: 1,
      pageSize: 10,
      sortDescriptor: {
        column: "createdAt",
        direction: "ascending",
      },
      searchFilters: initialSearchFilters,
      visibleColumns: new Set(INITIAL_VISIBLE_BOOKS_COLUMNS),

      // Actions
      setCurrPage: (page: number) => set({ currPage: page }),
      setPageSize: (size: number) => set({ pageSize: size }),
      setSortDescriptor: (descriptor: SortDescriptor) =>
        set({ sortDescriptor: descriptor }),
      setSearchFilters: (filters) =>
        set((state) => ({
          searchFilters:
            typeof filters === "function"
              ? filters(state.searchFilters)
              : filters,
        })),
      setVisibleColumns: (columns: Selection) =>
        set({ visibleColumns: columns }),
      resetFilters: () =>
        set({
          searchFilters: initialSearchFilters,
          currPage: 1,
        }),
      handlePageSizeChange: (newPageSize: number) =>
        set({
          pageSize: newPageSize,
          currPage: 1,
        }),
    }),
    {
      name: "books-table-store",
    },
  ),
);
export default useBooksTableStore;
