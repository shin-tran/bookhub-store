import type { ActionsProps, InputFieldConfig } from "@/types/manage-users";
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
import { useUpdateUser } from "@hooks/useUsers";
import { Icon } from "@iconify/react/dist/iconify.js";
import type { HTMLMotionProps } from "framer-motion";

const UpdateUser = ({ isOpen, onOpenChange, onClose, user }: ActionsProps) => {
  const updateUserMutation = useUpdateUser();

  const handleUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const res = await updateUserMutation.mutateAsync({
      _id: String(user._id),
      fullName: String(data.fullName),
      email: String(data.email),
      phone: String(data.phone),
    });
    if (res?.data) {
      addToast({
        title: "Update User Success",
        color: "success",
        timeout: 3000,
      });
      onClose?.();
    } else {
      addToast({
        title: "Update User Error",
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
      label: "Full Name",
      name: "fullName",
      type: "text",
      variant: "bordered",
      defaultValue: user.fullName,
      startContent: (
        <Icon icon="solar:user-bold" className="text-default-400 text-xl" />
      ),
    },
    {
      isDisabled: true,
      isRequired: true,
      label: "Email",
      name: "email",
      type: "email",
      variant: "bordered",
      defaultValue: user.email,
      startContent: (
        <Icon icon="solar:letter-bold" className="text-default-400 text-xl" />
      ),
    },
    {
      isRequired: true,
      label: "Phone Number",
      name: "phone",
      type: "tel",
      variant: "bordered",
      defaultValue: user.phone,
      startContent: (
        <Icon icon="solar:phone-bold" className="text-default-400 text-xl" />
      ),
    },
  ];

  return (
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
              Update User
            </ModalHeader>
            <ModalBody>
              <Form
                className="flex flex-col gap-3"
                onSubmit={handleUpdateSubmit}
              >
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
                    isLoading={updateUserMutation.isPending}
                  >
                    {updateUserMutation.isPending ? "Updating..." : "Update"}
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
export default UpdateUser;
