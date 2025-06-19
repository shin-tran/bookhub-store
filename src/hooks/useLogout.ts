import { addToast } from "@heroui/react";
import { useAuth } from "@hooks/useAuth";
import { useLogoutUser } from "@hooks/useUsers";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export const useLogout = () => {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const queryClient = useQueryClient();
  const logoutMutation = useLogoutUser();

  const handleLogout = async () => {
    const res = await logoutMutation.mutateAsync();
    if (res) {
      addToast({
        title: t("auth.logout"),
        color: "success",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
      queryClient.clear();
      logout();
    }
  };

  return {
    handleLogout,
    isLoggingOut: logoutMutation.isPending,
  };
};
