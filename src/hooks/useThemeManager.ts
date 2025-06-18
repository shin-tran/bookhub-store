import { useEffect } from "react";

/**
 * Custom hook để quản lý theme cho các trang authentication (login, signup)
 * Sử dụng khi không thể dùng ThemeProvider của HeroUI
 */
export const useThemeManager = () => {
  useEffect(() => {
    const applyTheme = () => {
      document.documentElement.classList.remove("light", "dark");

      const savedTheme = localStorage.getItem("heroui-theme");

      if (savedTheme && savedTheme !== "system") {
        document.documentElement.classList.add(savedTheme);
      } else {
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)",
        ).matches;
        const systemTheme = prefersDark ? "dark" : "light";
        document.documentElement.classList.add(systemTheme);
      }
    };
    applyTheme();
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = () => {
      const savedTheme = localStorage.getItem("heroui-theme");
      if (!savedTheme || savedTheme === "system") {
        applyTheme();
      }
    };
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "heroui-theme") {
        applyTheme();
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    window.addEventListener("storage", handleStorageChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
};
