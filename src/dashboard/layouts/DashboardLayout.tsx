import { HeroUIProvider } from "@heroui/react";
import { useThemeManager } from "@hooks/useThemeManager";
import { Outlet, useHref, useNavigate } from "react-router";
import DashboardProvider from "./DashboardProvider";
import SidebarWrapper from "@dashboard/components/sidebar/SidebarWrapper";
import NavbarWrapper from "@dashboard/components/navbar/NavbarWrapper";

const DashboardLayout = () => {
  useThemeManager();
  const navigate = useNavigate();

  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      <DashboardProvider>
        <section className="flex">
          <SidebarWrapper />
          <NavbarWrapper>
            <Outlet />
          </NavbarWrapper>
        </section>
      </DashboardProvider>
    </HeroUIProvider>
  );
};
export default DashboardLayout;
