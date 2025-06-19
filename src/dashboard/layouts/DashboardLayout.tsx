import { Outlet } from "react-router";
import DashboardProvider from "./DashboardProvider";
import SidebarWrapper from "@dashboard/components/sidebar/SidebarWrapper";
import NavbarWrapper from "@dashboard/components/navbar/NavbarWrapper";
import { useAuth } from "@hooks/useAuth";
import Error from "@pages/Error";

const DashboardLayout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Error code="404" />;
  }

  return (
    <DashboardProvider>
      <section className="flex">
        <SidebarWrapper />
        <NavbarWrapper>
          <Outlet />
        </NavbarWrapper>
      </section>
    </DashboardProvider>
  );
};
export default DashboardLayout;
