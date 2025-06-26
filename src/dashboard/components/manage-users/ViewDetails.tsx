import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Button,
  Image,
  Tooltip,
  Chip,
  Snippet,
} from "@heroui/react";
import type { UserDetail } from "@/types/api";
import { Icon } from "@iconify/react/dist/iconify.js";

interface ViewDetailsProps {
  isOpen: boolean;
  onOpenChange: () => void;
  user: UserDetail;
}

const ViewDetails = ({ isOpen, onOpenChange, user }: ViewDetailsProps) => {
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

  return (
    <Drawer
      hideCloseButton
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      motionProps={motionProps}
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
              User Details
            </DrawerHeader>
            <DrawerBody className="space-y-4">
              <div className="flex w-full items-center justify-center pt-4">
                <Image
                  isBlurred
                  isZoomed
                  radius="full"
                  className="aspect-square w-full"
                  height={300}
                  alt="Avatar"
                  src={`${import.meta.env.VITE_API_URL}/images/avatar/${user.avatar}`}
                />
              </div>
              <div className="flex items-center">
                <h4 className="w-30 text-sm font-semibold">ID:</h4>
                <Snippet hideSymbol>{user._id}</Snippet>
              </div>
              <div className="flex">
                <h4 className="w-30 text-sm font-semibold">Full Name:</h4>
                <p className="text-default-600 text-sm">{user.fullName}</p>
              </div>
              <div className="flex items-center">
                <h4 className="w-30 text-sm font-semibold">Email:</h4>
                <Snippet hideSymbol>{user.email}</Snippet>
              </div>
              <div className="flex">
                <h4 className="w-30 text-sm font-semibold">Phone:</h4>
                <p className="text-default-600 text-sm">{user.phone}</p>
              </div>
              <div className="flex">
                <h4 className="w-30 text-sm font-semibold">Role:</h4>
                <p className="text-default-600 text-sm">{user.role}</p>
              </div>
              <div className="flex">
                <h4 className="w-30 text-sm font-semibold">Status:</h4>
                <Chip
                  size="sm"
                  variant="flat"
                  color={user.isActive ? "success" : "danger"}
                >
                  <span className="text-xs capitalize">
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </Chip>
              </div>
              <div className="flex">
                <h4 className="w-30 text-sm font-semibold">Created At:</h4>
                <p className="text-default-600 flex items-center gap-1 text-sm">
                  <Icon icon={"line-md:calendar"} fontSize={20} />
                  {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                </p>
              </div>
              <div className="flex">
                <h4 className="w-30 text-sm font-semibold">Updated At:</h4>
                <p className="text-default-600 flex items-center gap-1 text-sm">
                  <Icon icon={"line-md:calendar"} fontSize={20} />
                  {new Date(user.updatedAt).toLocaleDateString("vi-VN")}
                </p>
              </div>
            </DrawerBody>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};
export default ViewDetails;
