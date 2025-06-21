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
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useDashboardConstants } from "@dashboard/hooks/useDashboardContants";

export const UserDropdown = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { handleLogout: originalHandleLogout, isLoggingOut } = useLogout();
  const { dashboardMenuItems } = useDashboardConstants();
  const navigate = useNavigate();

  const handleCustomLogout = async () => {
    await originalHandleLogout();
    navigate("/login");
  };

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
        onAction={(actionKey) => {
          if (actionKey === "logout") {
            handleCustomLogout();
          } else {
            console.log({ actionKey });
          }
        }}
      >
        {dashboardMenuItems.map((item) => {
          if (item.isProfile) {
            return (
              <DropdownItem
                key={item.action}
                className={item.className}
                textValue={item.label}
              >
                <p>{t("menu.signedInAs")}</p>
                <p>{user?.email}</p>
              </DropdownItem>
            );
          }

          if (item.action === "logout") {
            return (
              <DropdownItem
                key={item.action}
                color={item.color as "danger"}
                className={item.className}
                textValue={item.label}
              >
                {isLoggingOut ? t("auth.loggingOut") : item.label}
              </DropdownItem>
            );
          }

          return (
            <DropdownItem key={item.action} textValue={item.label}>
              {item.label}
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
};
