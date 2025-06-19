import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { useThemeManager } from "@hooks/useThemeManager";
import { Outlet, useHref, useNavigate } from "react-router";

const AuthLayout = () => {
  useThemeManager();
  const navigate = useNavigate();

  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      <ToastProvider placement="top-center" />
      <Outlet />
    </HeroUIProvider>
  );
};
export default AuthLayout;
