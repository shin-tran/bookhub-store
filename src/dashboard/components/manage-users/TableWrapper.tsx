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
  Input,
  Button,
  DateRangePicker,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  type Selection,
  Form,
} from "@heroui/react";
import { RenderCell } from "./RenderCell";
import { useGetPaginations, useReloadPaginations } from "@hooks/useUsers";
import { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { AddUser } from "./AddUser";
import {
  capitalize,
  INITIAL_VISIBLE_USERS_COLUMNS,
  UsersTableColumns,
} from "@dashboard/constants/dashboardContansts";

export const TableWrapper = () => {
  const [currPage, setCurrPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { data: users, isLoading } = useGetPaginations(currPage, pageSize);
  const reloadPaginations = useReloadPaginations();
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_USERS_COLUMNS),
  );

  const totalPages = users?.meta?.pages || 1;
  const totalItems = users?.meta?.total || 0;

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrPage(1);
  };

  const headerColumns = useMemo(() => {
    return UsersTableColumns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log(data);
  };

  const topContent = useMemo(() => {
    const pageSizeOptions = [
      { value: 5, label: "5 per page" },
      { value: 10, label: "10 per page" },
      { value: 20, label: "20 per page" },
      { value: 50, label: "50 per page" },
    ];

    return (
      <>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Form
            onReset={handleSubmitForm}
            onSubmit={handleSubmitForm}
            className="flex-row flex-wrap items-center lg:flex-nowrap"
          >
            <Input
              isClearable
              startContent={<Icon icon={"mdi:users"} fontSize={24} />}
              classNames={{
                input: "w-full",
                mainWrapper: "w-full",
              }}
              name="fullName"
              placeholder="Search by full name..."
            />
            <Input
              isClearable
              startContent={<Icon icon={"ic:outline-email"} fontSize={24} />}
              classNames={{
                input: "w-full",
                mainWrapper: "w-full",
              }}
              name="email"
              placeholder="Search by email..."
            />
            <DateRangePicker
              aria-label="Date Range"
              className="max-w-xs"
              startName="startDate"
              endName="endDate"
              label="Created at"
            />
            <Button type="reset">
              <span>
                <Icon icon={"ci:arrows-reload-01"} fontSize={20} />
              </span>
              Reset
            </Button>
            <Button type="submit">
              <span>
                <Icon icon={"mdi:sql-query"} fontSize={20} />
              </span>
              Query
            </Button>
          </Form>
          <div className="flex flex-row flex-wrap gap-3.5">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<Icon icon={"mdi:chevron-down"} />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {UsersTableColumns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <AddUser />
            <Button
              color="primary"
              startContent={<Icon icon={"pajamas:export"} fontSize={16} />}
            >
              Export to CSV
            </Button>
          </div>
        </div>

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
                    (Showing{" "}
                    {Math.min((currPage - 1) * pageSize + 1, totalItems)}-
                    {Math.min(currPage * pageSize, totalItems)} of {totalItems})
                  </span>
                )}
              </>
            )}
          </div>

          <div className="flex items-center justify-center gap-2">
            <Button onPress={() => reloadPaginations.mutate()}>
              <span>
                <Icon icon={"ci:arrows-reload-01"} fontSize={20} />
              </span>
              Reload
            </Button>

            {/* Page Size Selector */}
            <Select
              aria-label="Page Size Selector"
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
        </div>
      </>
    );
  }, [
    currPage,
    isLoading,
    pageSize,
    reloadPaginations,
    totalItems,
    visibleColumns,
  ]);

  const bottomContent = useMemo(() => {
    return (
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
            onChange={setCurrPage}
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
    );
  }, [currPage, isLoading, totalPages, users]);

  return (
    <>
      <div className="flex w-full flex-col gap-4">
        <Table
          aria-label="Manage Users"
          className={isLoading ? "opacity-60" : ""}
          topContent={topContent}
          topContentPlacement="outside"
          bottomContent={bottomContent}
          bottomContentPlacement={"outside"}
          onSortChange={(descriptor) => console.log(descriptor)}
        >
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={
                  ["actions", "isActive", "role"].includes(column.uid)
                    ? "center"
                    : "start"
                }
                allowsSorting={column.sortable}
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
    </>
  );
};
