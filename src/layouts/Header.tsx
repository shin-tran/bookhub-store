import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Spinner,
} from "@heroui/react";
import ThemeToggle from "@components/ThemeToggle";
import HeroLink from "@components/HeroLink";
import { Icon } from "@iconify/react";
import LanguageSwitcher from "@components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useAuth } from "@hooks/useAuth";

const Header = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated, isUserLoading } = useAuth();

  console.log(user);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  const navigationItems = [
    { label: t("header.home"), path: "/", icon: "heroicons:home" },
    {
      label: t("header.books", "Books"),
      path: "/books",
      icon: "heroicons:book-open",
    },
    {
      label: t("header.about"),
      path: "/about",
      icon: "heroicons:information-circle",
    },
  ];

  const userMenuItems = [
    { label: "Profile", icon: "heroicons:user", action: "profile" },
    { label: "Dashboard", icon: "heroicons:squares-2x2", action: "dashboard" },
    { label: "Orders", icon: "heroicons:shopping-bag", action: "orders" },
    { label: "Favorites", icon: "heroicons:heart", action: "favorites" },
    { label: "Settings", icon: "heroicons:cog-6-tooth", action: "settings" },
    {
      label: "Logout",
      icon: "heroicons:arrow-right-on-rectangle",
      action: "logout",
      isDanger: true,
    },
  ];

  const handleUserMenuAction = (action: string) => {
    switch (action) {
      case "logout":
        logout();
        break;
      case "profile":
        // Navigate to profile
        break;
      case "dashboard":
        // Navigate to dashboard
        break;
      default:
        console.log(`Action: ${action}`);
    }
  };

  return (
    <Navbar
      className="shadow-sm"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="2xl"
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarBrand>
        <HeroLink to="/" className="text-xl font-bold text-inherit">
          <Icon icon="oi:book" className="mr-2" />
          BookHub Store
        </HeroLink>
      </NavbarBrand>

      {/* Navigation Links - Desktop */}
      <NavbarContent className="hidden gap-2 lg:flex" justify="center">
        {navigationItems.map((item) => (
          <NavbarItem key={item.path}>
            <HeroLink
              to={item.path}
              className="group flex items-center space-x-2 rounded-lg px-3 py-2 transition-all duration-200"
            >
              <Icon icon={item.icon} className="transition-colors" />
              <span className="font-medium transition-colors">
                {item.label}
              </span>
            </HeroLink>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        {isAuthenticated ? (
          <>
            {isUserLoading ? (
              <NavbarItem>
                <div className="flex items-center space-x-2 px-3 py-2">
                  <Spinner size="sm" color="primary" />
                  <span className="text-sm">Loading...</span>
                </div>
              </NavbarItem>
            ) : (
              <>
                {/* User Menu */}
                <NavbarItem>
                  <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                      <div className="flex cursor-pointer items-center space-x-3 rounded-lg p-2 transition-colors">
                        <div className="hidden text-right sm:block">
                          <p className="text-sm font-semibold">
                            {user?.fullName || "User"}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {user?.email || "user@example.com"}
                          </p>
                        </div>
                        <Avatar
                          src={`${import.meta.env.VITE_API_URL}/images/avatar/${user?.avatar}`}
                          name={user?.fullName || "U"}
                          size="sm"
                        />
                        <Icon
                          icon="heroicons:chevron-down"
                          className="text-sm text-slate-500"
                        />
                      </div>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="User menu"
                      onAction={(key) => handleUserMenuAction(key as string)}
                    >
                      {userMenuItems.map((item) => (
                        <DropdownItem
                          key={item.action}
                          startContent={
                            <Icon icon={item.icon} className="text-lg" />
                          }
                          color={item.isDanger ? "danger" : "default"}
                          className={item.isDanger ? "text-danger" : ""}
                        >
                          {item.label}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </NavbarItem>
              </>
            )}
          </>
        ) : (
          <>
            <NavbarItem className="hidden sm:flex">
              <HeroLink to="/signup">{t("header.signup")}</HeroLink>
            </NavbarItem>
            <NavbarItem>
              <HeroLink to="/login">{t("header.login")}</HeroLink>
            </NavbarItem>
          </>
        )}

        {/* Theme Toggle & Language Switcher */}
        <NavbarItem>
          <div className="flex items-center space-x-2 rounded-lg">
            <LanguageSwitcher />
            <div className="h-6 w-px"></div>
            <ThemeToggle size="sm" />
          </div>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <HeroLink
              className="w-full"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
              }
              to="#"
              size="lg"
            >
              {item}
            </HeroLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
