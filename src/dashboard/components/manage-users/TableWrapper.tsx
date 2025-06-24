import {
  Pagination,
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
  Skeleton,
  type Selection,
  type SortDescriptor,
  Form,
} from "@heroui/react";
import { RenderCell } from "./RenderCell";
import { useGetPaginations, useReloadPaginations } from "@hooks/useUsers";
import { useMemo, useState, useCallback, useEffect } from "react";
import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { AddUser } from "./AddUser";
import {
  capitalize,
  INITIAL_VISIBLE_USERS_COLUMNS,
  UsersTableColumns,
} from "@dashboard/constants/dashboardContansts";
import RenderSkeletonCell from "./renderSkeletonCell";

dayjs.extend(utc);

export const TableWrapper = () => {
  const [currPage, setCurrPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "createdAt",
    direction: "ascending",
  });

  const [searchFilters, setSearchFilters] = useState({
    fullName: "",
    email: "",
    dateRange: undefined as
      | { startDate?: string; endDate?: string }
      | undefined,
    sortBy: undefined as string | undefined,
  });

  const formatDateForAPI = useCallback(
    (dateString: string, isEndDate = false) => {
      const date = dayjs(dateString);

      if (isEndDate) {
        return date.endOf("day").toISOString();
      } else {
        return date.startOf("day").toISOString();
      }
    },
    [],
  );

  const { data: users, isLoading } = useGetPaginations(
    currPage,
    pageSize,
    searchFilters.fullName || undefined,
    searchFilters.email || undefined,
    searchFilters.dateRange,
    searchFilters.sortBy,
  );

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

  const handleSubmitForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData);

      let dateRange: { startDate?: string; endDate?: string } | undefined;
      if (data.startDate && data.endDate) {
        dateRange = {
          startDate: formatDateForAPI(data.startDate as string, false),
          endDate: formatDateForAPI(data.endDate as string, true),
        };
      }

      setSearchFilters({
        fullName: (data.fullName as string) || "",
        email: (data.email as string) || "",
        dateRange,
        sortBy: searchFilters.sortBy,
      });

      setCurrPage(1);
    },
    [formatDateForAPI, searchFilters.sortBy],
  );

  const handleResetForm = useCallback(() => {
    setSearchFilters({
      fullName: "",
      email: "",
      dateRange: undefined,
      sortBy: undefined,
    });
    setCurrPage(1);
  }, []);

  useEffect(() => {
    if (sortDescriptor && sortDescriptor.column && sortDescriptor.direction) {
      console.log(sortDescriptor.direction);
      const sortBy =
        sortDescriptor.direction === "ascending"
          ? String(sortDescriptor.column)
          : `-${String(sortDescriptor.column)}`;
      setSearchFilters((prev) => ({
        ...prev,
        sortBy: sortBy,
      }));
    }
  }, [sortDescriptor]);

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
            onReset={handleResetForm}
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
              defaultValue={searchFilters.fullName}
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
              defaultValue={searchFilters.email}
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
            <>
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
            </>
          </div>
        </div>
        {/* Total Count */}
        <div className="flex items-center justify-between">
          <div className="text-small text-default-500">
            {isLoading ? (
              <Skeleton className="h-5 w-60 rounded" />
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
    handleSubmitForm,
    handleResetForm,
    searchFilters.fullName,
    searchFilters.email,
  ]);

  const bottomContent = useMemo(() => {
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
  }, [currPage, isLoading, totalPages, users]);

  return (
    <>
      <div className="flex w-full flex-col gap-4">
        <Table
          aria-label="Manage Users"
          topContent={topContent}
          topContentPlacement="outside"
          bottomContent={bottomContent}
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
