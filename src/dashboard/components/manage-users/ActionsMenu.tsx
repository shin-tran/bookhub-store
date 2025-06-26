import {
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

interface ActionsMenuProps {
  user: UserDetail;
}

const ActionsMenu = ({ user }: ActionsMenuProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
            <DropdownItem
              key="view"
              textValue="view"
              onPress={() => {
                console.log("Viewing user:", user);
                onOpen();
              }}
            >
              View details
            </DropdownItem>
            <DropdownItem key="update" textValue="update">
              Update
            </DropdownItem>
            <DropdownItem key="delete" color="danger" textValue="delete">
              Delete
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <ViewDetails isOpen={isOpen} onOpenChange={onOpenChange} user={user} />
    </>
  );
};
export default ActionsMenu;
