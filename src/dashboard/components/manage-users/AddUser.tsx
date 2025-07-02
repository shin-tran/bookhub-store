import type { InputFieldConfig } from "@/types/manage-users";
import {
  addToast,
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { useCreateUser } from "@hooks/useUsers";
import { Icon } from "@iconify/react";
import type { HTMLMotionProps } from "framer-motion";

export const AddUser = () => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const createUserMutation = useCreateUser();

  const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const res = await createUserMutation.mutateAsync({
      fullName: String(data.fullName),
      email: String(data.email),
      password: String(data.password),
      phone: String(data.phone),
    });
    if (res?.data) {
      addToast({ title: "Create New User Success", color: "success" });
      onClose();
    } else {
      addToast({
        title: "Error Create New User",
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
      name: "fullName",
      label: "Full Name",
      type: "text",
      placeholder: "Enter full name",
      variant: "bordered",
      startContent: (
        <Icon icon="solar:user-bold" className="text-default-400 text-xl" />
      ),
    },
    {
      isRequired: true,
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter email address",
      variant: "bordered",
      startContent: (
        <Icon icon="solar:letter-bold" className="text-default-400 text-xl" />
      ),
    },
    {
      isRequired: true,
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter password",
      variant: "bordered",
      startContent: (
        <Icon
          icon="solar:lock-password-bold"
          className="text-default-400 text-xl"
        />
      ),
    },
    {
      isRequired: true,
      name: "phone",
      label: "Phone Number",
      type: "tel",
      placeholder: "Enter phone number",
      variant: "bordered",
      startContent: (
        <Icon icon="solar:phone-bold" className="text-default-400 text-xl" />
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
          Add User
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
                  Add New User
                </ModalHeader>
                <ModalBody>
                  <Form
                    className="flex flex-col gap-3"
                    onSubmit={handleSignupSubmit}
                  >
                    {inputFields.map((field) => (
                      <Input
                        key={field.name}
                        isRequired={field.isRequired}
                        label={field.label}
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        variant={field.variant}
                        startContent={field.startContent}
                        isDisabled={createUserMutation.isPending}
                      />
                    ))}
                    <div className="flex w-full items-center justify-end gap-4 py-4">
                      <Button
                        color="danger"
                        variant="flat"
                        onPress={onClose}
                        isDisabled={createUserMutation.isPending}
                      >
                        Close
                      </Button>
                      <Button
                        color="primary"
                        type="submit"
                        isLoading={createUserMutation.isPending}
                      >
                        {createUserMutation.isPending
                          ? "Adding..."
                          : "Add User"}
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
