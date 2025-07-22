import useBooksTableStore from "@dashboard/stores/booksTableStore";
import { useGetBookPaginations } from "@hooks/useBooks";
import { useEffect } from "react";

const useBooksTable = () => {
  const {
    currPage,
    pageSize,
    searchFilters,
    sortDescriptor,
    setSortDescriptor,
    setSearchFilters,
  } = useBooksTableStore();

  const { data: books, isLoading } = useGetBookPaginations(
    currPage,
    pageSize,
    searchFilters.mainText,
    searchFilters.author,
    searchFilters.sortBy,
  );

  const totalPages = books?.meta?.pages || 1;
  const totalItems = books?.meta?.total || 0;

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
    books,
    isLoading,
    totalPages,
    totalItems,
    sortDescriptor,
    setSortDescriptor,
  };
};
export default useBooksTable;
