import type { UserDetail } from "@/types/api";
import {
  User,
  Chip,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
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
        <div className="relative flex items-center justify-center gap-2">
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light">
                <Icon
                  icon={"entypo:dots-three-vertical"}
                  fontSize={20}
                  className="text-default-300"
                />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem key="view">View</DropdownItem>
              <DropdownItem key="edit">Edit</DropdownItem>
              <DropdownItem key="delete" color="danger">
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      );
    default:
      return cellValue;
  }
};
