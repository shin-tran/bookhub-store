import {
  addToast,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useDisclosure,
} from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import ViewDetails from "./ViewDetails";
import type { UserDetail } from "@/types/api";
import UpdateUser from "./UpdateUser";
import { useDeleteUser } from "@hooks/useUsers";

interface ActionsMenuProps {
  user: UserDetail;
}

const ActionsMenu = ({ user }: ActionsMenuProps) => {
  const {
    isOpen: isViewOpen,
    onOpen: onViewOpen,
    onOpenChange: onViewOpenChange,
  } = useDisclosure();

  const {
    isOpen: isUpdateOpen,
    onOpen: onUpdateOpen,
    onClose: onUpdateClose,
    onOpenChange: onUpdateOpenChange,
  } = useDisclosure();

  const deleteUserMutation = useDeleteUser();

  const handleDeleteUser = async () => {
    const res = await deleteUserMutation.mutateAsync(user._id);
    if (res.data) {
      addToast({
        title: "Delete User Success",
        color: "success",
        timeout: 3000,
      });
    } else {
      addToast({
        title: res.message,
        color: "danger",
        timeout: 3000,
      });
    }
  };

  return (
    <>
      {/* Actions menu */}
      <div className="relative flex items-center justify-center gap-2">
        <Dropdown>
          <DropdownTrigger>
            <Button isIconOnly size="sm" variant="light">
              <Icon
                icon={"entypo:dots-three-vertical"}
                fontSize={20}
                className="text-default-300"
              />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem key="view" textValue="view" onPress={onViewOpen}>
              View details
            </DropdownItem>
            <DropdownItem
              key="update"
              textValue="update"
              onPress={onUpdateOpen}
            >
              Update
            </DropdownItem>
            <DropdownItem
              key="delete"
              color="danger"
              textValue="delete"
              onPress={handleDeleteUser}
            >
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <ViewDetails
        isOpen={isViewOpen}
        onOpenChange={onViewOpenChange}
        user={user}
      />
      <UpdateUser
        isOpen={isUpdateOpen}
        onOpenChange={onUpdateOpenChange}
        onClose={onUpdateClose}
        user={user}
      />
    </>
  );
};
export default ActionsMenu;
