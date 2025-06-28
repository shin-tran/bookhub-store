import {
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import type { HTMLMotionProps } from "framer-motion";

export const AddUser = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
    console.log(data);
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
