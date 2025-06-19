import { Input, Navbar, NavbarContent } from "@heroui/react";
import { BurguerButton } from "./BurguerButton";
import { Icon } from "@iconify/react";
import { UserDropdown } from "./UserDropdown";
import { NotificationsDropdown } from "./NotificationsDropdown";
import { Link } from "react-router";

interface IProps {
  children: React.ReactNode;
}

const NavbarWrapper = ({ children }: IProps) => {
  return (
    <div className="relative flex flex-1 flex-col">
      <Navbar
        isBordered
        className="w-full"
        classNames={{
          wrapper: "w-full max-w-full",
        }}
      >
        <NavbarContent className="md:hidden">
          <BurguerButton />
        </NavbarContent>
        <NavbarContent className="w-full max-md:hidden">
          <Input
            startContent={<Icon icon={"ic:outline-search"} fontSize={22} />}
            isClearable
            className="w-full"
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            placeholder="Search..."
          />
        </NavbarContent>
        <NavbarContent
          justify="end"
          className="w-fit data-[justify=end]:flex-grow-0"
        >
          <div className="flex items-center gap-2 max-md:hidden">
            <Icon icon={"material-symbols:feedback"} fontSize={22} />
            <span>Feedback?</span>
          </div>

          <NotificationsDropdown />

          <div className="max-md:hidden">
            <Icon icon={"ix:support"} fontSize={22} />
          </div>

          <Link
            to="https://github.com/shin-tran/bookhub-store"
            target={"_blank"}
            // className="text-black dark:text-white"
          >
            <Icon icon={"line-md:github-loop"} fontSize={22} />
          </Link>
          <NavbarContent>
            <UserDropdown />
          </NavbarContent>
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
};
export default NavbarWrapper;
