import { useSidebarContext } from "@dashboard/layouts/DashboardProvider";
import { useLocation } from "react-router";
import { Sidebar } from "./sidebarStyles";
import { Icon } from "@iconify/react";
import { SidebarItem } from "./SidebarItem";
import { SidebarMenu } from "./SidebarMenu";
import { CollapseMenu } from "./CollapseMenu";

const SidebarWrapper = () => {
  const location = useLocation();
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
        <div className={Sidebar.Header()}></div>
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
        </div>
      </div>
    </aside>
  );
};
export default SidebarWrapper;
