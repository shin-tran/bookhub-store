import { useLockedBody } from "@dashboard/hooks/useLockedBody";
import React, { createContext, use } from "react";

interface SidebarContext {
  collapsed: boolean;
  setCollapsed: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const SidebarContext = createContext<SidebarContext>({
  collapsed: false,
  setCollapsed: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useSidebarContext = () => {
  return use(SidebarContext);
};

const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setLocked] = useLockedBody(false);
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setLocked(!sidebarOpen);
  };
  return (
    <SidebarContext
      value={{
        collapsed: sidebarOpen,
        setCollapsed: handleToggleSidebar,
      }}
    >
      {children}
    </SidebarContext>
  );
};
export default DashboardProvider;
