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
          placement="top-center"
          motionProps={motionProps}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Add New User
                </ModalHeader>
                <ModalBody>
                  <Form
                    className="flex flex-col gap-3"
                    onSubmit={handleSignupSubmit}
                  >
                    <Input
                      isRequired
                      label="Full Name"
                      name="fullName"
                      type="text"
                      variant="bordered"
                    />
                    <Input
                      isRequired
                      label="Password"
                      name="password"
                      type="text"
                      variant="bordered"
                    />
                    <Input
                      isRequired
                      label="Email"
                      name="email"
                      type="email"
                      variant="bordered"
                    />
                    <Input
                      isRequired
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      variant="bordered"
                    />
                    <div className="flex w-full items-center justify-end gap-4 py-4">
                      <Button color="danger" variant="flat" onPress={onClose}>
                        Close
                      </Button>
                      <Button color="primary" type="submit">
                        Add User
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
