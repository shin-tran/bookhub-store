import type { BookDetail } from "@/types/api";
import { Image } from "@heroui/react";
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
        <div className="flex max-w-fit items-center gap-2">
          <div className="flex-shrink-0">
            <Image
              src={`${import.meta.env.VITE_API_URL}/images/book/${book?.thumbnail}`}
              className="size-22 object-contain"
            />
          </div>
          <span className="max-w-[300px] break-words">{cellValue}</span>
        </div>
      );
    case "author":
      return (
        <span className="inline-block max-w-[200px] break-words">
          {cellValue}
        </span>
      );
    case "price":
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(Number(cellValue));
    case "quantity":
    case "sold":
      return (cellValue || 0).toLocaleString();
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
