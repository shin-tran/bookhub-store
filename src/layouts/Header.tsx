import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import ThemeToggle from "@components/ThemeToggle";
import HeroLink from "@components/HeroLink";
import { Icon } from "@iconify/react";

const Header = () => {
  return (
    <Navbar className="shadow-sm">
      <NavbarBrand>
        <HeroLink to="/" className="text-xl font-bold text-inherit">
          <Icon icon="oi:book" className="mr-2" />
          BookHub Store
        </HeroLink>
      </NavbarBrand>

      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarItem>
          <HeroLink to="/" color="foreground">
            Home
          </HeroLink>
        </NavbarItem>
        <NavbarItem>
          <HeroLink to="/about" color="foreground">
            About
          </HeroLink>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <HeroLink color="primary" to="/login">
            Login
          </HeroLink>
        </NavbarItem>
        <NavbarItem>
          <ThemeToggle size="sm" />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
