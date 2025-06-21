import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export const useDashboardConstants = () => {
  const { t } = useTranslation();

  const dashboardMenuItems = useMemo(
    () => [
      {
        label: t("menu.profile"),
        icon: "heroicons:user",
        action: "profile",
        path: "/admin/profile",
        className: "flex w-full flex-col items-start justify-start",
        isProfile: true,
      },
      {
        label: t("menu.settings"),
        icon: "heroicons:cog-6-tooth",
        action: "settings",
        path: "/admin/settings",
      },
      {
        label: "Team Settings",
        icon: "heroicons:users",
        action: "team_settings",
        path: "/admin/team-settings",
      },
      {
        label: "Analytics",
        icon: "heroicons:chart-bar",
        action: "analytics",
        path: "/admin/analytics",
      },
      {
        label: "System",
        icon: "heroicons:cog-8-tooth",
        action: "system",
        path: "/admin/system",
      },
      {
        label: "Configurations",
        icon: "heroicons:adjustments-horizontal",
        action: "configurations",
        path: "/admin/configurations",
      },
      {
        label: "Help & Feedback",
        icon: "heroicons:question-mark-circle",
        action: "help_and_feedback",
        path: "/admin/help",
      },
      {
        label: t("auth.logout"),
        icon: "heroicons:arrow-right-on-rectangle",
        action: "logout",
        isDanger: true,
        color: "danger",
        className: "text-danger",
      },
    ],
    [t],
  );

  return { dashboardMenuItems };
};
