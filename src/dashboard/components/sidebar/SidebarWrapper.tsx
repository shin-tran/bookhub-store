import { useSidebarContext } from "@dashboard/layouts/DashboardProvider";
import { useLocation } from "react-router";
import { Sidebar } from "./sidebarStyles";
import { CompaniesDropdown } from "./CompaniesDropdown";
import { Icon } from "@iconify/react";
import { SidebarItem } from "./SidebarItem";
import { SidebarMenu } from "./SidebarMenu";
import { Avatar, Tooltip } from "@heroui/react";
import { CollapseMenu } from "./CollapseMenu";
import { useAuth } from "@hooks/useAuth";

const SidebarWrapper = () => {
  const location = useLocation();
  const { user } = useAuth();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="sticky top-0 z-[20] h-screen">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <CompaniesDropdown />
        </div>
        <div className="flex h-full flex-col justify-between">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Overview"
              icon={<Icon icon={"uil:chart"} />}
              isActive={location.pathname === "/admin"}
              href="/admin"
            />
            <SidebarMenu title="Main Menu">
              <SidebarItem
                isActive={location.pathname === "/admin/manage-users"}
                title="Manage users"
                icon={<Icon icon={"mdi:accounts"} />}
                href="/admin/manage-users"
              />
              <SidebarItem
                isActive={location.pathname === "/admin/manage-books"}
                title="Manage books"
                icon={<Icon icon={"mdi:books"} />}
                href="/admin/manage-books"
              />
              <SidebarItem
                isActive={location.pathname === "/admin/manage-orders"}
                title="Manage orders"
                icon={<Icon icon={"mdi:accounts"} />}
                href="/admin/manage-orders"
              />
              <CollapseMenu
                icon={<Icon icon={"mdi:accounts"} />}
                title="Balances"
              >
                <SidebarItem
                  isActive={location.pathname === "/admin/manage-orders"}
                  title="Manage orders"
                  icon={<Icon icon={"mdi:accounts"} />}
                  href="/admin/manage-orders"
                />
              </CollapseMenu>
            </SidebarMenu>
          </div>
          <div className={Sidebar.Footer()}>
            <Tooltip content={"Settings"} color="primary">
              <div className="max-w-fit">
                <Icon icon={"weui:setting-filled"} fontSize={25} />
              </div>
            </Tooltip>
            <Tooltip content={"Adjustments"} color="primary">
              <div className="max-w-fit">
                <Icon icon={"ri:filter-fill"} fontSize={25} />
              </div>
            </Tooltip>
            <Tooltip content={"Profile"} color="primary">
              <Avatar
                src={`${import.meta.env.VITE_API_URL}/images/avatar/${user?.avatar}`}
                size="sm"
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </aside>
  );
};
export default SidebarWrapper;
