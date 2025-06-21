import {
  Avatar,
  Badge,
  Button,
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
import { Link as HeroLink } from "@heroui/react";
import { Icon } from "@iconify/react";
import LanguageSwitcher from "@components/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useAuth } from "@hooks/useAuth";
import { useLogout } from "@hooks/useLogout";
import { Link, NavLink } from "react-router";
import { useGlobalConstants } from "@hooks/useGlobalConstants";

const Header = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, isUserLoading } = useAuth();
  const { handleLogout } = useLogout();
  const { navigationItems, userMenuItems, menuItems } = useGlobalConstants();

  const handleUserMenuAction = (action: string) => {
    switch (action) {
      case "logout":
        handleLogout();
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
      {/* Logo */}
      <NavbarBrand>
        <HeroLink href="/" className="text-xl font-bold text-inherit">
          <Icon icon="oi:book" className="mr-2" />
          BookHub Store
        </HeroLink>
      </NavbarBrand>

      {/* Navigation Links - Desktop */}
      <NavbarContent className="hidden gap-2 md:flex" justify="center">
        {navigationItems.map((item) => (
          <NavbarItem key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center space-x-2 rounded-lg px-3 py-2 ${isActive ? "bg-white/20" : "transition-all duration-200 hover:bg-white/20"}`
              }
            >
              <Icon icon={item.icon} className="transition-colors" />
              <span className="font-medium transition-colors">
                {item.label}
              </span>
            </NavLink>
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
                {/* Cart badge */}
                <Link to="/checkout">
                  <Badge color="danger" content={5} shape="circle">
                    <Icon
                      icon={"material-symbols:shopping-cart-checkout"}
                      fontSize={26}
                    />
                  </Badge>
                </Link>
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
                      {userMenuItems
                        .filter((item) => {
                          if (user?.role === "ADMIN") return true;
                          else
                            return (
                              user?.role && item.roles?.includes(user.role)
                            );
                        })
                        .map((item) => (
                          <DropdownItem
                            key={item.action}
                            startContent={
                              <Icon icon={item.icon} className="text-lg" />
                            }
                            color={item.isDanger ? "danger" : "default"}
                            className={item.isDanger ? "text-danger" : ""}
                            textValue={item.label}
                          >
                            {item.path ? (
                              <Link to={item.path}>{item.label}</Link>
                            ) : (
                              item.label
                            )}
                          </DropdownItem>
                        ))}
                    </DropdownMenu>
                  </Dropdown>
                </NavbarItem>
              </>
            )}
          </>
        ) : (
          // Login, signup btn
          <NavbarItem className="hidden gap-2 md:flex">
            <Button as={Link} color="primary" to="/login" variant="flat">
              {t("auth.login")}
            </Button>
            <Button as={Link} color="primary" to="/signup" variant="flat">
              {t("auth.signup")}
            </Button>
          </NavbarItem>
        )}

        {/* Theme Toggle & Language Switcher */}
        <NavbarItem className="hidden md:flex">
          <div className="flex items-center space-x-2 rounded-lg">
            <LanguageSwitcher />
            <div className="h-6 w-px"></div>
            <ThemeToggle size="sm" />
          </div>
        </NavbarItem>
      </NavbarContent>

      {/* Mobie menu btn */}
      <NavbarContent className="md:hidden" justify="end">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <HeroLink
              className="w-full justify-center"
              color={
                index === 2
                  ? "warning"
                  : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
              }
              href="#"
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
