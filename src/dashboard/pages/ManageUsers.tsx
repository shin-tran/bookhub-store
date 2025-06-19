import { AddUser } from "@dashboard/components/manage-users/AddUser";
import { TableWrapper } from "@dashboard/components/manage-users/TableWrapper";
import { BreadcrumbItem, Breadcrumbs, Button, Input } from "@heroui/react";
import { Icon } from "@iconify/react";
import { Link } from "react-router";

const ManageUsers = () => {
  return (
    <div className="mx-auto my-10 flex w-full max-w-[95rem] flex-col gap-4 px-4 lg:px-6">
      <Breadcrumbs>
        <BreadcrumbItem>
          <Link to={"/"}>Home</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link to={"/admin"}>Dashboard</Link>
        </BreadcrumbItem>
        <BreadcrumbItem>Manage Users</BreadcrumbItem>
      </Breadcrumbs>

      <h3 className="text-xl font-semibold">All Accounts</h3>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 md:flex-nowrap">
          <Input
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            placeholder="Search users"
          />
          <Icon icon={"ic:round-settings"} fontSize={34} />
          <Icon icon={"tabler:trash"} fontSize={34} />
          <Icon icon={"material-symbols:info"} fontSize={34} />
          <Icon icon={"pepicons-pop:dots-y"} fontSize={34} />
        </div>
        <div className="flex flex-row flex-wrap gap-3.5">
          <AddUser />
          <Button
            color="primary"
            startContent={<Icon icon={"pajamas:export"} />}
          >
            Export to CSV
          </Button>
        </div>
      </div>
      <div className="mx-auto w-full max-w-[95rem]">
        <TableWrapper />
      </div>
    </div>
  );
};
export default ManageUsers;
