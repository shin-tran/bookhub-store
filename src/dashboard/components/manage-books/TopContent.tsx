import {
  Select,
  SelectItem,
  Input,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Skeleton,
  Form,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useCallback } from "react";
import {
  capitalize,
  BooksTableColumns,
} from "@dashboard/constants/dashboardContansts";
import useBooksTableStore from "@dashboard/stores/booksTableStore";
import useBooksTable from "@dashboard/hooks/useBooksTable";
import { useReloadPaginations } from "@hooks/useBooks";
import CreateBook from "./CreateBook";

export const TopContent = () => {
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
  } = useBooksTableStore();
  const { totalItems, isLoading } = useBooksTable();

  const reloadPaginations = useReloadPaginations();

  const handleSubmitForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData);

      setSearchFilters({
        mainText: (data.mainText as string) || "",
        author: (data.author as string) || "",
        sortBy: searchFilters.sortBy,
      });

      setCurrPage(1);
    },
    [searchFilters.sortBy, setSearchFilters, setCurrPage],
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
            name="mainText"
            placeholder="Search by book name..."
            defaultValue={searchFilters.mainText}
          />
          <Input
            isClearable
            startContent={<Icon icon={"fa6-solid:user-tag"} fontSize={19} />}
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            name="author"
            placeholder="Search by author..."
            defaultValue={searchFilters.author}
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
                {BooksTableColumns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <CreateBook />
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
              Total {totalItems} books
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
