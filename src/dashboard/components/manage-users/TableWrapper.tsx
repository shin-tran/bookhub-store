import {
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
  const pageSize = 20;
  const { data: users } = useGetPaginations(page, pageSize);
  console.log(users?.result);
  return (
    <div className="flex w-full flex-col gap-4">
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={[...STATIC_CONSTANTS.COLUMNS]}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={
                ["actions", "isActive", "role"].includes(column.uid) ? "center" : "start"
              }
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={users?.result || []}>
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
