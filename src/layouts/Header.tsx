import {
  Button,
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
import { useAuthStore } from "@stores/authStore";

type TProps = {
  isUserLoading?: boolean;
};

const Header = ({ isUserLoading }: TProps) => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuthStore();

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

  return (
    <Navbar
      className="shadow-sm"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
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

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarItem>
          <HeroLink to="/" color="foreground">
            {t("header.home")}
          </HeroLink>
        </NavbarItem>
        <NavbarItem>
          <HeroLink to="/about" color="foreground">
            {t("header.about")}
          </HeroLink>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        {isAuthenticated ? (
          <>
            {isUserLoading ? (
              <Spinner variant="dots" />
            ) : (
              <>
                <NavbarItem>
                  <span>Hi, {user?.fullName}</span>
                </NavbarItem>
                <NavbarItem>
                  <Button
                    color="danger"
                    variant="flat"
                    size="sm"
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </NavbarItem>
              </>
            )}
          </>
        ) : (
          <>
            <NavbarItem>
              <HeroLink color="primary" to="/login">
                {t("header.login")}
              </HeroLink>
            </NavbarItem>
          </>
        )}
        <NavbarItem>
          <LanguageSwitcher />
        </NavbarItem>
        <NavbarItem>
          <ThemeToggle size="sm" />
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
