import { useThemeManager } from "@hooks/useThemeManager";
import { Outlet } from "react-router";
import DashboardProvider from "./DashboardProvider";
import SidebarWrapper from "@dashboard/components/sidebar/SidebarWrapper";
import NavbarWrapper from "@dashboard/components/navbar/NavbarWrapper";

const DashboardLayout = () => {
  useThemeManager();

  return (
    <DashboardProvider>
      <section className="flex">
        <SidebarWrapper />
        <NavbarWrapper><Outlet /></NavbarWrapper>
      </section>
    </DashboardProvider>
  );
};
export default DashboardLayout;
