import { Pagination, Skeleton } from "@heroui/react";
import { useUsersTableStore } from "@dashboard/stores/usersTableStore";
import type { UsersPaginatedResponse } from "@/types/api";

interface BottomContentProps {
  isLoading: boolean;
  totalPages: number;
  users?: UsersPaginatedResponse;
}

export const BottomContent = ({
  isLoading,
  totalPages,
  users,
}: BottomContentProps) => {
  const { currPage, setCurrPage } = useUsersTableStore();

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
      {isLoading && !users ? (
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
          `${users?.result?.length || 0} items`
        )}
      </span>
    </div>
  );
};
