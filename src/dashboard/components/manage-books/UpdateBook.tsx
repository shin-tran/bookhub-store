import type { BookActionsProps, InputFieldConfig } from "@/types/config";
import ImagePreviewGallery from "@components/ImagePreviewGallery";
import {
  addToast,
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";
import { useUpdateBook } from "@hooks/useBooks";
import { Icon } from "@iconify/react/dist/iconify.js";
import type { HTMLMotionProps } from "framer-motion";
import { useState } from "react";

const UpdateBook = ({
  isOpen,
  onOpenChange,
  onClose,
  book,
}: BookActionsProps) => {
  const [imageList, setImageList] = useState([
    book.thumbnail,
    ...(book.slider || []),
  ]);
  const [currPreview, setCurrPreview] = useState<string | null>(
    `${import.meta.env.VITE_API_URL}/images/book/${book.thumbnail}`,
  );
  const updateBookMutation = useUpdateBook();

  const handleUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const res = await updateBookMutation.mutateAsync({
      _id: book._id,
      thumbnail: book.thumbnail,
      slider: book.slider,
      mainText: String(data.mainText),
      author: String(data.author),
      price: Number(data.price),
      category: String(data.category),
      quantity: Number(data.quantity),
      sold: Number(data.sold),
    });
    if (res?.data) {
      addToast({
        title: "Update Book Success",
        color: "success",
        timeout: 3000,
      });
      onClose?.();
    } else {
      addToast({
        title: "Update Book Error",
        description: res.message,
        color: "danger",
        timeout: 3000,
      });
    }
  };

  const motionProps: HTMLMotionProps<"section"> = {
    variants: {
      enter: {
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.3,
          ease: "easeOut",
        },
      },
      exit: {
        y: -20,
        opacity: 0,
        transition: {
          duration: 0.2,
          ease: "easeIn",
        },
      },
    },
  };

  const inputFields: InputFieldConfig[] = [
    {
      isRequired: true,
      name: "mainText",
      label: "Book Name",
      type: "text",
      placeholder: "Enter book name",
      variant: "bordered",
      defaultValue: book.mainText,
      startContent: (
        <Icon icon="tdesign:book-filled" className="text-default-400 text-xl" />
      ),
    },
    {
      isRequired: true,
      name: "author",
      label: "Author",
      type: "text",
      placeholder: "Enter author name",
      variant: "bordered",
      defaultValue: book.author,
      startContent: (
        <Icon icon="fa-solid:user-tag" className="text-default-400 text-xl" />
      ),
    },
    {
      isRequired: true,
      name: "price",
      label: "Price",
      type: "text",
      placeholder: "Enter price",
      variant: "bordered",
      defaultValue: String(book.price),
      startContent: (
        <Icon
          icon="solar:tag-price-bold"
          className="text-default-400 text-xl"
        />
      ),
      endContent: (
        <div className="pointer-events-none flex items-center">
          <span className="text-default-400 text-small">đ</span>
        </div>
      ),
    },
    {
      isRequired: true,
      name: "category",
      label: "Category",
      type: "text",
      placeholder: "Choose price",
      variant: "bordered",
      defaultValue: book.category,
      startContent: (
        <Icon icon="bxs:category" className="text-default-400 text-xl" />
      ),
    },
    {
      isRequired: true,
      name: "quantity",
      label: "Quantity",
      type: "text",
      placeholder: "Enter quantity",
      variant: "bordered",
      defaultValue: String(book.quantity),
      startContent: (
        <Icon
          icon="fluent-mdl2:quantity"
          className="text-default-400 text-xl"
        />
      ),
    },
    {
      isRequired: true,
      name: "sold",
      label: "Sold",
      type: "text",
      placeholder: "Enter sold",
      variant: "bordered",
      defaultValue: String(book.sold),
      startContent: (
        <Icon icon="ep:sold-out" className="text-default-400 text-xl" />
      ),
    },
  ];

  return (
    <Modal
      hideCloseButton
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      motionProps={motionProps}
      scrollBehavior="inside"
      size="xl"
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Update Book
            </ModalHeader>
            <ModalBody>
              <Form
                className="flex flex-col gap-3"
                onSubmit={handleUpdateSubmit}
              >
                <div className="w-full">
                  <ImagePreviewGallery
                    images={imageList.map(
                      (img) =>
                        `${import.meta.env.VITE_API_URL}/images/book/${img}`,
                    )}
                    currPreview={currPreview}
                    setCurrPreview={setCurrPreview}
                  />
                </div>

                {inputFields.map((field) => (
                  <Input
                    key={field.name}
                    isDisabled={field.isDisabled}
                    isRequired={field.isRequired}
                    label={field.label}
                    name={field.name}
                    type={field.type}
                    variant={field.variant}
                    defaultValue={field.defaultValue}
                  />
                ))}
                <div className="flex w-full items-center justify-end gap-4 py-4">
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    isLoading={updateBookMutation.isPending}
                  >
                    {updateBookMutation.isPending ? "Updating..." : "Update"}
                  </Button>
                </div>
              </Form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
export default UpdateBook;
