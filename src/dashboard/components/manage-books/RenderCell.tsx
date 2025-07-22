import type { BookDetail } from "@/types/api";
import { User } from "@heroui/react";
import ActionsMenu from "./ActionsMenu";

interface Props {
  book: BookDetail;
  columnKey: string | React.Key;
}

const RenderCell = ({ book, columnKey }: Props) => {
  const cellValue = book[columnKey as keyof BookDetail];
  switch (columnKey) {
    case "mainText":
      return (
        <User
          avatarProps={{
            src: `${import.meta.env.VITE_API_URL}/images/book/${book?.thumbnail}`,
          }}
          name={cellValue}
        />
      );
    case "price":
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(Number(cellValue));
    case "quantity":
    case "sold":
      return (cellValue || 0).toLocaleString()
    case "createdAt": {
      const date = new Date(cellValue as string);
      return <span>{date.toLocaleDateString("vi-VN")}</span>;
    }
    case "updatedAt": {
      const date = new Date(cellValue as string);
      return <span>{date.toLocaleDateString("vi-VN")}</span>;
    }
    case "actions":
      return <ActionsMenu book={book} />;
    default:
      return cellValue;
  }
};
export default RenderCell;
