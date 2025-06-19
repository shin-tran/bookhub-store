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
        >
          {user.email}
        </User>
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
            <button className="cursor-pointer" onClick={() => console.log("View user", user.id)}>
              <Icon icon={"mdi:eye"} fontSize={18} />
            </button>
          </Tooltip>
          <Tooltip content="Edit user" color="secondary">
            <button className="cursor-pointer" onClick={() => console.log("Edit user", user.id)}>
              <Icon icon={"tabler:edit"} fontSize={18} />
            </button>
          </Tooltip>
          <Tooltip content="Delete user" color="danger">
            <button className="cursor-pointer" onClick={() => console.log("Delete user", user.id)}>
              <Icon icon={"material-symbols:delete"} fontSize={18} className="text-red-400" />
            </button>
          </Tooltip>
        </div>
      );
    default:
      return cellValue;
  }
};
