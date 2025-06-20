import {
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Select,
  SelectItem,
} from "@heroui/react";
import { RenderCell } from "./RenderCell";
import { STATIC_CONSTANTS } from "@/constants/staticConstants";
import { useGetPaginations } from "@hooks/useUsers";
import { useState } from "react";

export const TableWrapper = () => {
  const [currPage, setCurrPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data: users, isLoading } = useGetPaginations(currPage, pageSize);

  const totalPages = users?.meta?.pages || 1;
  const totalItems = users?.meta?.total || 0;

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrPage(1);
  };

  const pageSizeOptions = [
    { value: 5, label: "5 per page" },
    { value: 10, label: "10 per page" },
    { value: 20, label: "20 per page" },
    { value: 50, label: "50 per page" },
  ];

  return (
    <div className="flex w-full flex-col gap-4">
      {/* Total Count */}
      <div className="flex items-center justify-between">
        <div className="text-small text-default-500">
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Spinner size="sm" />
              <span>Loading...</span>
            </div>
          ) : (
            <>
              Total {totalItems} users
              {totalItems > 0 && (
                <span className="ml-2">
                  (Showing {Math.min((currPage - 1) * pageSize + 1, totalItems)}
                  -{Math.min(currPage * pageSize, totalItems)} of {totalItems})
                </span>
              )}
            </>
          )}
        </div>

        {/* Page Size Selector */}
        <Select
          aria-label="Page Size Selector"
          size="sm"
          className="max-w-[150px]"
          selectedKeys={[pageSize.toString()]}
          onSelectionChange={(keys) => {
            const selectedValue = Array.from(keys)[0] as string;
            handlePageSizeChange(Number(selectedValue));
          }}
          isDisabled={isLoading}
        >
          {pageSizeOptions.map((option) => (
            <SelectItem key={option.value.toString()}>
              {option.label}
            </SelectItem>
          ))}
        </Select>
      </div>

      <Table
        aria-label="Manage Users"
        className={isLoading ? "opacity-60" : ""}
        bottomContent={
          <div className="flex w-full items-center justify-between px-2">
            {/* Left bottom */}
            <span className="text-small text-default-400">
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Spinner size="sm" />
                  <span>Loading...</span>
                </div>
              ) : (
                `Page ${currPage} of ${totalPages}`
              )}
            </span>

            {/* Pagination */}
            {isLoading && !users ? (
              <Spinner size="sm" />
            ) : (
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={currPage}
                total={totalPages}
                onChange={(page) => {
                  setCurrPage(page);
                }}
              />
            )}

            {/* Right bottom */}
            <span className="text-small text-default-400">
              {isLoading ? (
                <Spinner size="sm" />
              ) : (
                `${users?.result?.length || 0} items`
              )}
            </span>
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
          emptyContent={"No rows to display."}
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
