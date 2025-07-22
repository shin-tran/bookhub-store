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
import type { BookDetail } from "@/types/api";
import { useDeleteUser } from "@hooks/useUsers";
import ViewDetails from "./ViewDetails";
import UpdateBook from "./UpdateBook";

interface ActionsMenuProps {
  book: BookDetail;
}

const ActionsMenu = ({ book }: ActionsMenuProps) => {
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

  const handleDeleteBook = async () => {
    const res = await deleteUserMutation.mutateAsync(book._id);
    if (res.data) {
      addToast({
        title: "Delete Book Success",
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
              onPress={handleDeleteBook}
            >
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <ViewDetails
        isOpen={isViewOpen}
        onOpenChange={onViewOpenChange}
        book={book}
      />
      <UpdateBook
        isOpen={isUpdateOpen}
        onOpenChange={onUpdateOpenChange}
        onClose={onUpdateClose}
        book={book}
      />
    </>
  );
};
export default ActionsMenu;
