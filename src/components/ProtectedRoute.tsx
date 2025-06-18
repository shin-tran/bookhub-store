import { Spinner } from "@heroui/react";
import { useAuth } from "@hooks/useAuth";
import Error from "@pages/Error";
import type React from "react";
import { useLocation } from "react-router";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user, isUserLoading } = useAuth();
  const location = useLocation();

  if (isUserLoading)
    return (
      <div className="flex min-h-screen min-w-screen items-center justify-center">
        <Spinner />
      </div>
    );

  if (isAuthenticated === false) {
    return <Error code="404" />;
  }

  const isAdminRoute = location.pathname.includes("admin");
  if (isAuthenticated && isAdminRoute) {
    const role = user?.role;
    if (role === "USER") return <Error code="403" />;
  }

  return <>{children}</>;
};
export default ProtectedRoute;
