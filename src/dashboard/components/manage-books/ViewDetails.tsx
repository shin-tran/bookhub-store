import type { BookActionsProps } from "@/types/config";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Button,
  Tooltip,
  Snippet,
  Chip,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useCallback, useEffect, useState } from "react";
import ImagePreviewGallery from "@components/ImagePreviewGallery";

type FieldType = "text" | "snippet" | "chip" | "date";

interface UserField {
  key: string;
  label: string;
  value: string | boolean | number;
  type: FieldType;
}

const ViewDetails = ({ isOpen, onOpenChange, book }: BookActionsProps) => {
  const [currThumbnail, setCurrThumbnail] = useState<string | null>(null);

  const ImageList = useCallback(() => {
    if (!book) return [];
    const sliderImages = Array.isArray(book.slider)
      ? book.slider.map(
          (img: string) => `${import.meta.env.VITE_API_URL}/images/book/${img}`,
        )
      : book.slider
        ? [`${import.meta.env.VITE_API_URL}/images/book/${book.slider}`]
        : [];
    return [
      `${import.meta.env.VITE_API_URL}/images/book/${book.thumbnail}`,
      ...sliderImages,
    ];
  }, [book]);

  useEffect(() => {
    if (currThumbnail === null || !ImageList().includes(currThumbnail)) {
      setCurrThumbnail(ImageList()[0] ?? null);
    }
  }, [ImageList, book, currThumbnail]);

  const motionProps = {
    variants: {
      enter: {
        opacity: 1,
        x: 0,
      },
      exit: {
        x: 100,
        opacity: 0,
      },
    },
    transition: {
      duration: 0.2,
    },
  };

  const userFields: UserField[] = [
    {
      key: "id",
      label: "ID:",
      value: book._id,
      type: "snippet",
    },
    {
      key: "mainText",
      label: "Book Name:",
      value: book.mainText,
      type: "text",
    },
    {
      key: "author",
      label: "Author:",
      value: book.author,
      type: "text",
    },
    {
      key: "price",
      label: "Price:",
      value: book.price,
      type: "text",
    },
    {
      key: "sold",
      label: "Sold:",
      value: book.sold,
      type: "text",
    },
    {
      key: "quantity",
      label: "Quantity:",
      value: book.quantity,
      type: "text",
    },
    {
      key: "category",
      label: "Category:",
      value: book.category,
      type: "chip",
    },
    {
      key: "createdAt",
      label: "Created At:",
      value: new Date(book.createdAt).toLocaleDateString("vi-VN"),
      type: "date",
    },
    {
      key: "updatedAt",
      label: "Updated At:",
      value: new Date(book.updatedAt).toLocaleDateString("vi-VN"),
      type: "date",
    },
  ];

  const renderFieldValue = (field: UserField) => {
    switch (field.type) {
      case "snippet":
        return <Snippet hideSymbol>{field.value}</Snippet>;
      case "date":
        return (
          <p className="text-default-600 flex items-center gap-1 text-sm">
            <Icon icon={"line-md:calendar"} fontSize={20} />
            {field.value}
          </p>
        );
      case "chip":
        return (
          <Chip size="sm" variant="flat" color={"success"}>
            <span className="text-xs capitalize">{field.value}</span>
          </Chip>
        );
      default:
        return (
          <p className="text-default-600 text-sm">
            {field.key === "price"
              ? new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(Number(field.value))
              : field.key === "quantity" || field.key === "sold"
                ? field.value.toLocaleString()
                : field.value}
          </p>
        );
    }
  };

  return (
    <Drawer
      hideCloseButton
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      motionProps={motionProps}
      size="lg"
    >
      <DrawerContent>
        {(onClose) => (
          <>
            <DrawerHeader className="flex gap-1">
              <Tooltip content="Close">
                <Button
                  isIconOnly
                  className="text-default-400"
                  size="sm"
                  variant="light"
                  onPress={onClose}
                >
                  <svg
                    fill="none"
                    height="20"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="m13 17 5-5-5-5M6 17l5-5-5-5" />
                  </svg>
                </Button>
              </Tooltip>
              Book Details
            </DrawerHeader>
            <DrawerBody className="space-y-4">
              <ImagePreviewGallery
                images={ImageList().filter(
                  (img): img is string => typeof img === "string",
                )}
                currPreview={currThumbnail}
                setCurrPreview={setCurrThumbnail}
              />

              {userFields.map((field) => (
                <div
                  key={field.key}
                  className={`flex ${field.type === "snippet" ? "items-center" : ""}`}
                >
                  <h4 className="w-30 text-sm font-semibold">{field.label}</h4>
                  {renderFieldValue(field)}
                </div>
              ))}
            </DrawerBody>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};
export default ViewDetails;
