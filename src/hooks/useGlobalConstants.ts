import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export const useGlobalConstants = () => {
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

  return { navigationItems, userMenuItems, menuItems };
};
