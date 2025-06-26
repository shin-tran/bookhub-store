import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Image,
  Tooltip,
} from "@heroui/react";
import type { UserDetail } from "@/types/api";

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
                  className="aspect-square w-full hover:scale-110"
                  height={300}
                  alt="Avatar"
                  src={`${import.meta.env.VITE_API_URL}/images/avatar/${user.avatar}`}
                />
              </div>
              <div>
                <h4 className="text-sm font-semibold">Full Name:</h4>
                <p className="text-default-600 text-sm">{user.fullName}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold">Email:</h4>
                <p className="text-default-600 text-sm">{user.email}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold">Phone:</h4>
                <p className="text-default-600 text-sm">{user.phone}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold">Role:</h4>
                <p className="text-default-600 text-sm">{user.role}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold">Status:</h4>
                <p className="text-default-600 text-sm">
                  {user.isActive ? "Active" : "Inactive"}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold">Created At:</h4>
                <p className="text-default-600 text-sm">
                  {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold">Updated At:</h4>
                <p className="text-default-600 text-sm">
                  {new Date(user.updatedAt).toLocaleDateString("vi-VN")}
                </p>
              </div>
            </DrawerBody>
            <DrawerFooter>
              <p className="font-bold text-center">Made with love by NgocDepTrai</p>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};
export default ViewDetails;
