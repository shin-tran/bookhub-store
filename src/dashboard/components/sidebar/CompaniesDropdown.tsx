import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useState } from "react";

interface Company {
  name: string;
  location: string;
  logo: React.ReactNode;
}

export const CompaniesDropdown = () => {
  const [company, setCompany] = useState<Company>({
    name: "Acme Co.",
    location: "Palo Alto, CA",
    logo: <Icon icon={"skill-icons:instagram"} />,
  });
  return (
    <Dropdown
      classNames={{
        base: "w-full min-w-[260px]",
      }}
    >
      <DropdownTrigger className="cursor-pointer">
        <div className="flex items-center gap-2">
          {company.logo}
          <div className="flex flex-col gap-4">
            <h3 className="text-default-900 m-0 -mb-4 text-xl font-medium whitespace-nowrap">
              {company.name}
            </h3>
            <span className="text-default-500 text-xs font-medium">
              {company.location}
            </span>
          </div>
          <Icon icon={"oi:caret-bottom"} />
        </div>
      </DropdownTrigger>
      <DropdownMenu
        onAction={(e) => {
          if (e === "1") {
            setCompany({
              name: "Facebook",
              location: "San Fransico, CA",
              logo: <Icon icon={"logos:facebook"} />,
            });
          }
          if (e === "2") {
            setCompany({
              name: "Instagram",
              location: "Austin, Tx",
              logo: <Icon icon={"skill-icons:instagram"} />,
            });
          }
          if (e === "3") {
            setCompany({
              name: "Twitter",
              location: "Brooklyn, NY",
              logo: <Icon icon={"logos:facebook"} />,
            });
          }
          if (e === "4") {
            setCompany({
              name: "Acme Co.",
              location: "Palo Alto, CA",
              logo: <Icon icon={"logos:facebook"} />,
            });
          }
        }}
        aria-label="Avatar Actions"
      >
        <DropdownSection title="Companies">
          <DropdownItem
            key="1"
            startContent={<Icon icon={"logos:facebook"} />}
            description="San Fransico, CA"
            classNames={{
              base: "py-4",
              title: "text-base font-semibold",
            }}
          >
            Facebook
          </DropdownItem>
          <DropdownItem
            key="2"
            startContent={<Icon icon={"logos:facebook"} />}
            description="Austin, Tx"
            classNames={{
              base: "py-4",
              title: "text-base font-semibold",
            }}
          >
            Instagram
          </DropdownItem>
          <DropdownItem
            key="3"
            startContent={<Icon icon={"logos:facebook"} />}
            description="Brooklyn, NY"
            classNames={{
              base: "py-4",
              title: "text-base font-semibold",
            }}
          >
            Twitter
          </DropdownItem>
          <DropdownItem
            key="4"
            startContent={<Icon icon={"logos:facebook"} />}
            description="Palo Alto, CA"
            classNames={{
              base: "py-4",
              title: "text-base font-semibold",
            }}
          >
            Acme Co.
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
