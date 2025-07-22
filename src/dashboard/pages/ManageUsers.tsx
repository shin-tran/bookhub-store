import { TableWrapper } from "@dashboard/components/manage-users/TableWrapper";
import { BreadcrumbItem, Breadcrumbs } from "@heroui/react";
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

      <h3 className="text-xl font-semibold">Manage Users</h3>
      <div className="mx-auto w-full max-w-[95rem]">
        <TableWrapper />
      </div>
    </div>
  );
};
export default ManageUsers;
