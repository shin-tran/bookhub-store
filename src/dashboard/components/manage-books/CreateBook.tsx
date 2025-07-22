import type { CategoryData } from "@/types/api";
import type { InputFieldConfig } from "@/types/config";
import {
  addToast,
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  NumberInput,
  Select,
  SelectItem,
  useDisclosure,
} from "@heroui/react";
import { useCreateBook } from "@hooks/useBooks";
import { Icon } from "@iconify/react";
import { bookService } from "@services/bookService";
import type { HTMLMotionProps } from "framer-motion";
import { useEffect, useState } from "react";

const CreateBook = () => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const createBookMutation = useCreateBook();
  const [categoryData, setCategoryData] = useState<CategoryData[]>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await bookService.getCategory();
      if (res) setCategoryData(res.data);
    };
    fetchData();
  }, []);

  const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    console.log(data);
    const res = await createBookMutation.mutateAsync({
      mainText: String(data.mainText),
      author: String(data.author),
      price: Number(data.price),
      category: String(data.category) as CategoryData,
      quantity: Number(data.quantity),
      sold: Number(data.sold),
      thumbnail: "",
      slider: [],
    });
    if (res?.data) {
      addToast({ title: "Create New Book Success", color: "success" });
      onClose();
    } else {
      addToast({
        title: "Create New Book Error",
        description:
          res.message && Array.isArray(res.message)
            ? res.message[0]
            : res.message,
        color: "danger",
        timeout: 2000,
      });
    }
  };

  const inputFields: InputFieldConfig[] = [
    {
      isRequired: true,
      name: "mainText",
      label: "Book Name",
      type: "text",
      placeholder: "Enter book name",
      variant: "bordered",
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
      startContent: (
        <Icon icon="ep:sold-out" className="text-default-400 text-xl" />
      ),
    },
  ];

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

  return (
    <div>
      <>
        <Button
          onPress={onOpen}
          color="primary"
          startContent={<Icon icon={"humbleicons:user-add"} fontSize={20} />}
        >
          Create Book
        </Button>
        <Modal
          hideCloseButton
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          motionProps={motionProps}
        >
          <ModalContent>
            {() => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Create New Book
                </ModalHeader>
                <ModalBody>
                  <Form
                    className="flex flex-col gap-3"
                    onSubmit={handleSignupSubmit}
                  >
                    {inputFields.map((field) => {
                      if (["price", "sold", "quantity"].includes(field.name)) {
                        return (
                          <NumberInput
                            key={field.name}
                            name={field.name}
                            isRequired={field.isRequired}
                            label={field.label}
                            placeholder={field.placeholder}
                            startContent={field.startContent}
                            endContent={field.endContent || null}
                            variant={field.variant}
                            validate={(value) => {
                              if (value < 0)
                                return "Price must be greater than 0";
                            }}
                            isDisabled={createBookMutation.isPending}
                            hideStepper
                            isClearable
                          />
                        );
                      } else if (field.name === "category") {
                        return (
                          <Select
                            key={field.name}
                            isRequired={field.isRequired}
                            label={field.label}
                            placeholder={field.placeholder}
                            startContent={field.startContent}
                            variant={field.variant}
                            name={field.name}
                            isDisabled={createBookMutation.isPending}
                          >
                            {(categoryData || []).map((category) => (
                              <SelectItem key={category}>{category}</SelectItem>
                            ))}
                          </Select>
                        );
                      } else {
                        return (
                          <Input
                            key={field.name}
                            isRequired={field.isRequired}
                            label={field.label}
                            name={field.name}
                            type={field.type}
                            placeholder={field.placeholder}
                            variant={field.variant}
                            startContent={field.startContent}
                            isDisabled={createBookMutation.isPending}
                          />
                        );
                      }
                    })}
                    <div className="flex w-full items-center justify-end gap-4 py-4">
                      <Button
                        color="danger"
                        variant="flat"
                        onPress={onClose}
                        isDisabled={createBookMutation.isPending}
                      >
                        Close
                      </Button>
                      <Button
                        color="primary"
                        type="submit"
                        isLoading={createBookMutation.isPending}
                      >
                        {createBookMutation.isPending
                          ? "Creating..."
                          : "Create Book"}
                      </Button>
                    </div>
                  </Form>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};
export default CreateBook;
