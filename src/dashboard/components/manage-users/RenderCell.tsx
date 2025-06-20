import type { UserDetail } from "@/types/api";
import { User, Tooltip, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";

interface Props {
  user: UserDetail;
  columnKey: string | React.Key;
}

export const RenderCell = ({ user, columnKey }: Props) => {
  const cellValue = user[columnKey as keyof UserDetail];
  switch (columnKey) {
    case "fullName":
      return (
        <User
          avatarProps={{
            src: `${import.meta.env.VITE_API_URL}/images/avatar/${user?.avatar}`,
          }}
          name={cellValue}
        />
      );
    case "role":
      return <span>{cellValue}</span>;
    case "isActive":
      return (
        <Chip size="sm" variant="flat" color={cellValue ? "success" : "danger"}>
          <span className="text-xs capitalize">
            {cellValue ? "Active" : "Paused"}
          </span>
        </Chip>
      );
    case "actions":
      return (
        <div className="flex items-center justify-center gap-4">
          <Tooltip content="Details">
            <span
              className="cursor-pointer active:opacity-50"
              onClick={() => console.log("View user", user.id)}
            >
              <Icon icon={"mdi:eye"} fontSize={18} />
            </span>
          </Tooltip>
          <Tooltip content="Edit user" color="secondary">
            <span
              className="cursor-pointer active:opacity-50"
              onClick={() => console.log("Edit user", user.id)}
            >
              <Icon icon={"tabler:edit"} fontSize={18} />
            </span>
          </Tooltip>
          <Tooltip content="Delete user" color="danger">
            <span
              className="text-danger cursor-pointer active:opacity-50"
              onClick={() => console.log("Delete user", user.id)}
            >
              <Icon icon={"material-symbols:delete"} fontSize={18} />
            </span>
          </Tooltip>
        </div>
      );
    default:
      return cellValue;
  }
};
