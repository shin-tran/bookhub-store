import { useEffect } from "react";
import { useUsersTableStore } from "@dashboard/stores/usersTableStore";
import { useGetPaginations } from "@hooks/useUsers";

export const useUsersTable = () => {
  const {
    currPage,
    pageSize,
    searchFilters,
    sortDescriptor,
    setSortDescriptor,
    setSearchFilters,
  } = useUsersTableStore();

  const { data: users, isLoading } = useGetPaginations(
    currPage,
    pageSize,
    searchFilters.fullName,
    searchFilters.email,
    searchFilters.dateRange,
    searchFilters.sortBy,
  );

  const totalPages = users?.meta?.pages || 1;
  const totalItems = users?.meta?.total || 0;

  useEffect(() => {
    if (sortDescriptor && sortDescriptor.column && sortDescriptor.direction) {
      const sortBy =
        sortDescriptor.direction === "ascending"
          ? String(sortDescriptor.column)
          : `-${String(sortDescriptor.column)}`;
      setSearchFilters((prev) => ({
        ...prev,
        sortBy: sortBy,
      }));
    }
  }, [sortDescriptor, setSearchFilters]);

  return {
    users,
    isLoading,
    totalPages,
    totalItems,
    sortDescriptor,
    setSortDescriptor,
  };
};
