import type { ActionsProps } from "@/types/manage-users";
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
import { Icon } from "@iconify/react/dist/iconify.js";

type FieldType = "text" | "snippet" | "chip" | "date";

interface UserField {
  key: string;
  label: string;
  value: string | boolean;
  type: FieldType;
}

const ViewDetails = ({ isOpen, onOpenChange, user }: ActionsProps) => {
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
      value: user._id,
      type: "snippet",
    },
    {
      key: "fullName",
      label: "Full Name:",
      value: user.fullName,
      type: "text",
    },
    {
      key: "email",
      label: "Email:",
      value: user.email,
      type: "snippet",
    },
    {
      key: "phone",
      label: "Phone:",
      value: user.phone,
      type: "text",
    },
    {
      key: "role",
      label: "Role:",
      value: user.role,
      type: "text",
    },
    {
      key: "status",
      label: "Status:",
      value: user.isActive,
      type: "chip",
    },
    {
      key: "createdAt",
      label: "Created At:",
      value: new Date(user.createdAt).toLocaleDateString("vi-VN"),
      type: "date",
    },
    {
      key: "updatedAt",
      label: "Updated At:",
      value: new Date(user.updatedAt).toLocaleDateString("vi-VN"),
      type: "date",
    },
  ];

  const renderFieldValue = (field: UserField) => {
    switch (field.type) {
      case "snippet":
        return <Snippet hideSymbol>{field.value}</Snippet>;
      case "chip":
        return (
          <Chip
            size="sm"
            variant="flat"
            color={(field.value as boolean) ? "success" : "danger"}
          >
            <span className="text-xs capitalize">
              {(field.value as boolean) ? "Active" : "Inactive"}
            </span>
          </Chip>
        );
      case "date":
        return (
          <p className="text-default-600 flex items-center gap-1 text-sm">
            <Icon icon={"line-md:calendar"} fontSize={20} />
            {field.value}
          </p>
        );
      default:
        return <p className="text-default-600 text-sm">{field.value}</p>;
    }
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
