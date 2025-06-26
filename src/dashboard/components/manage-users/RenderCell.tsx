import type { UserDetail } from "@/types/api";
import { User, Chip } from "@heroui/react";
import ActionsMenu from "./ActionsMenu";

interface Props {
  user: UserDetail;
  columnKey: string | React.Key;
}

const RenderCell = ({ user, columnKey }: Props) => {
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
    case "createdAt": {
      const date = new Date(cellValue as string);
      return <span>{date.toLocaleDateString("vi-VN")}</span>;
    }
    case "actions":
      return <ActionsMenu user={user} />;
    default:
      return cellValue;
  }
};
export default RenderCell;
