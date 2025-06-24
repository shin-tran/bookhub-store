import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Skeleton,
} from "@heroui/react";
import { RenderCell } from "./RenderCell";
import { useMemo } from "react";
import { UsersTableColumns } from "@dashboard/constants/dashboardContansts";
import RenderSkeletonCell from "./RenderSkeletonCell";
import { TopContent } from "./TopContent";
import { BottomContent } from "./BottomContent";
import { useUsersTableStore } from "@dashboard/stores/usersTableStore";
import { useUsersTable } from "@dashboard/hooks/useUsersTable";

export const TableWrapper = () => {
  const { visibleColumns, pageSize } = useUsersTableStore();
  const {
    users,
    isLoading,
    totalPages,
    totalItems,
    sortDescriptor,
    setSortDescriptor,
  } = useUsersTable();

  const headerColumns = useMemo(() => {
    return UsersTableColumns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const skeletonRows = useMemo(() => {
    return Array.from({ length: pageSize }, (_, index) => ({
      _id: `skeleton-${index}`,
      id: `skeleton-${index}`,
      fullName: "",
      email: "",
      phone: "",
      role: "",
      isActive: false,
      avatar: "",
      createdAt: "",
      updatedAt: "",
    }));
  }, [pageSize]);

  return (
    <>
      <div className="flex w-full flex-col gap-4">
        <Table
          aria-label="Manage Users"
          topContent={
            <TopContent totalItems={totalItems} isLoading={isLoading} />
          }
          topContentPlacement="outside"
          bottomContent={
            <BottomContent
              isLoading={isLoading}
              totalPages={totalPages}
              users={users}
            />
          }
          bottomContentPlacement={"outside"}
          onSortChange={setSortDescriptor}
          sortDescriptor={sortDescriptor}
        >
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={["actions"].includes(column.uid) ? "center" : "start"}
                allowsSorting={column.sortable}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={isLoading ? skeletonRows : users?.result || []}
            loadingContent={<Skeleton className="h-16 w-full rounded" />}
            isLoading={false}
            emptyContent={"No rows to display."}
          >
            {(item) => (
              <TableRow key={item._id}>
                {(columnKey) => (
                  <TableCell>
                    {isLoading
                      ? RenderSkeletonCell(columnKey)
                      : RenderCell({ user: item, columnKey: columnKey })}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
