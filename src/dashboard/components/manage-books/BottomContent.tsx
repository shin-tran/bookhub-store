import type { BooksPaginatedResponse } from "@/types/api";
import useBooksTableStore from "@dashboard/stores/booksTableStore";
import { Pagination, Skeleton } from "@heroui/react";

interface BottomContentProps {
  isLoading: boolean;
  totalPages: number;
  books?: BooksPaginatedResponse;
}

export const BottomContent = ({
  isLoading,
  totalPages,
  books,
}: BottomContentProps) => {
  const { currPage, setCurrPage } = useBooksTableStore();

  return (
    <div className="flex w-full items-center justify-between px-2">
      {/* Left bottom */}
      <span className="text-small text-default-400">
        {isLoading ? (
          <Skeleton className="h-4 w-30 rounded" />
        ) : (
          `Page ${currPage} of ${totalPages}`
        )}
      </span>

      {/* Pagination */}
      {isLoading && !books ? (
        <Skeleton className="h-8 w-64 rounded-lg" />
      ) : (
        <Pagination
          isCompact
          showControls
          showShadow
          color="secondary"
          page={currPage}
          total={totalPages}
          onChange={setCurrPage}
        />
      )}

      {/* Right bottom */}
      <span className="text-small text-default-400">
        {isLoading ? (
          <Skeleton className="h-4 w-16 rounded" />
        ) : (
          `${books?.result?.length || 0} items`
        )}
      </span>
    </div>
  );
};
