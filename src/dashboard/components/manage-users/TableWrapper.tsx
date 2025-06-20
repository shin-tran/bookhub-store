import {
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { RenderCell } from "./RenderCell";
import { STATIC_CONSTANTS } from "@/constants/staticConstants";
import { useGetPaginations } from "@hooks/useUsers";
import { useState } from "react";

export const TableWrapper = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data: users, isLoading } = useGetPaginations(page, pageSize);
  const loadingState =
    isLoading || users?.meta.total === 0 ? "loading" : "idle";

  console.log(users);
  return (
    <div className="flex w-full flex-col gap-4">
      <Table
        aria-label="Manage Users"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={users?.meta.pages || 1}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader columns={[...STATIC_CONSTANTS.COLUMNS]}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={
                ["actions", "isActive", "role"].includes(column.uid)
                  ? "center"
                  : "start"
              }
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={users?.result || []}
          loadingContent={<Spinner />}
          isLoading={isLoading}
          loadingState={loadingState}
        >
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>
                  {RenderCell({ user: item, columnKey: columnKey })}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
