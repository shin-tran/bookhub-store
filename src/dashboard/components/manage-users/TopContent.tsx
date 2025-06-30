import {
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
  Form,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useCallback } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { AddUser } from "./AddUser";
import {
  capitalize,
  UsersTableColumns,
} from "@dashboard/constants/dashboardContansts";
import { useUsersTableStore } from "@dashboard/stores/usersTableStore";
import { useReloadPaginations } from "@hooks/useUsers";
import FileImport from "./FileImport";

dayjs.extend(utc);

interface TopContentProps {
  totalItems: number;
  isLoading: boolean;
}

export const TopContent = ({ totalItems, isLoading }: TopContentProps) => {
  const {
    currPage,
    pageSize,
    searchFilters,
    visibleColumns,
    setSearchFilters,
    setCurrPage,
    setVisibleColumns,
    handlePageSizeChange,
    resetFilters,
  } = useUsersTableStore();

  const reloadPaginations = useReloadPaginations();

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
    [formatDateForAPI, searchFilters.sortBy, setSearchFilters, setCurrPage],
  );

  const handleResetForm = useCallback(() => {
    resetFilters();
  }, [resetFilters]);

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
              Export
            </Button>
            <FileImport />
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
                  (Showing {Math.min((currPage - 1) * pageSize + 1, totalItems)}
                  -{Math.min(currPage * pageSize, totalItems)} of {totalItems})
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
};
