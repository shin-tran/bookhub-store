import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { BottomContent } from "./BottomContent";
import { useMemo } from "react";
import useBooksTableStore from "@dashboard/stores/booksTableStore";
import { BooksTableColumns } from "@dashboard/constants/dashboardContansts";
import useBooksTable from "@dashboard/hooks/useBooksTable";
import RenderCell from "./RenderCell";
import RenderSkeletonCell from "./RenderSkeletonCell";
import { TopContent } from "./TopContent";

const TableWrapper = () => {
  const { visibleColumns, pageSize } = useBooksTableStore();
  const { books, isLoading, totalPages, sortDescriptor, setSortDescriptor } =
    useBooksTable();

  const headerColumns = useMemo(() => {
    return BooksTableColumns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const skeletonRows = useMemo(() => {
    return Array.from({ length: pageSize }, (_, index) => ({
      _id: `skeleton-${index}`,
      mainText: "",
      author: "",
      price: 0,
      sold: 0,
      quantity: 0,
      category: "",
      createdAt: "",
      updatedAt: "",
      thumbnail: "",
      slider: [],
    }));
  }, [pageSize]);

  return (
    <>
      <div className="flex w-full flex-col gap-4">
        <Table
          aria-label="Manage Users"
          topContent={<TopContent />}
          topContentPlacement="outside"
          bottomContent={
            <BottomContent
              isLoading={isLoading}
              totalPages={totalPages}
              books={books}
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
            items={isLoading ? skeletonRows : books?.result || []}
            loadingContent={<Skeleton className="h-16 w-full rounded" />}
            emptyContent={"No rows to display."}
          >
            {(item) => (
              <TableRow key={item._id}>
                {(columnKey) => (
                  <TableCell>
                    {isLoading
                      ? RenderSkeletonCell(columnKey)
                      : RenderCell({ book: item, columnKey: columnKey })}
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
export default TableWrapper;
