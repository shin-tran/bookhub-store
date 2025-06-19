import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
} from "@heroui/react";
import { useAuth } from "@hooks/useAuth";
import { useLogout } from "@hooks/useLogout";

export const UserDropdown = () => {
  const { user } = useAuth();
  const { handleLogout, isLoggingOut } = useLogout();

  return (
    <Dropdown>
      <NavbarItem>
        <DropdownTrigger>
          <Avatar
            as="button"
            size="md"
            src={`${import.meta.env.VITE_API_URL}/images/avatar/${user?.avatar}`}
          />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="User menu actions"
        onAction={(actionKey) => console.log({ actionKey })}
      >
        <DropdownItem
          key="profile"
          className="flex w-full flex-col items-start justify-start"
        >
          <p>Signed in as</p>
          <p>{user?.email}</p>
        </DropdownItem>
        <DropdownItem key="settings">My Settings</DropdownItem>
        <DropdownItem key="team_settings">Team Settings</DropdownItem>
        <DropdownItem key="analytics">Analytics</DropdownItem>
        <DropdownItem key="system">System</DropdownItem>
        <DropdownItem key="configurations">Configurations</DropdownItem>
        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          className="text-danger"
          onPress={handleLogout}
          isDisabled={isLoggingOut}
        >
          {isLoggingOut ? "Logging out..." : "Log Out"}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
