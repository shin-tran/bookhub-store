import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Selection, SortDescriptor } from "@heroui/react";
import { INITIAL_VISIBLE_USERS_COLUMNS } from "@dashboard/constants/dashboardContansts";

interface SearchFilters {
  fullName: string;
  email: string;
  dateRange?: { startDate?: string; endDate?: string };
  sortBy?: string;
}

interface UsersTableState {
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
  fullName: "",
  email: "",
  dateRange: undefined,
  sortBy: undefined,
};

export const useUsersTableStore = create<UsersTableState>()(
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
      visibleColumns: new Set(INITIAL_VISIBLE_USERS_COLUMNS),

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
      name: "users-table-store",
    },
  ),
);
