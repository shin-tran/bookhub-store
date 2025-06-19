import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export const useConstants = () => {
  const { t } = useTranslation();

  const menuItems = useMemo(
    () => [
      t("menu.profile"),
      t("menu.dashboard"),
      t("menu.checkout"),
      t("menu.favorites"),
      t("menu.settings"),
      t("auth.logout"),
    ],
    [t],
  );

  const navigationItems = useMemo(
    () => [
      { label: t("navigation.home"), path: "/", icon: "heroicons:home" },
      {
        label: t("navigation.books"),
        path: "/books",
        icon: "heroicons:book-open",
      },
      {
        label: t("navigation.about"),
        path: "/about",
        icon: "heroicons:information-circle",
      },
    ],
    [t],
  );

  const userMenuItems = useMemo(
    () => [
      {
        label: t("menu.profile"),
        icon: "heroicons:user",
        action: "profile",
        roles: ["USER"],
        path: "/profile",
      },
      {
        label: t("menu.dashboard"),
        icon: "heroicons:squares-2x2",
        action: "dashboard",
        roles: ["ADMIN"],
        path: "/admin",
      },
      {
        label: t("menu.checkout"),
        icon: "heroicons:shopping-bag",
        action: "checkout",
        roles: ["USER"],
        path: "/checkout",
      },
      {
        label: t("menu.favorites"),
        icon: "heroicons:heart",
        action: "favorites",
        roles: ["USER"],
        path: "/favorites",
      },
      {
        label: t("menu.settings"),
        icon: "heroicons:cog-6-tooth",
        action: "settings",
        roles: ["USER"],
        path: "/settings",
      },
      {
        label: t("auth.logout"),
        icon: "heroicons:arrow-right-on-rectangle",
        action: "logout",
        isDanger: true,
        roles: ["USER"],
      },
    ],
    [t],
  );

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

  return { navigationItems, userMenuItems, menuItems, dashboardMenuItems };
};
