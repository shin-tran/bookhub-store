import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language;

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="light" size="sm" isIconOnly>
          <Icon icon="heroicons:language-20-solid" className="text-lg" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Language selection"
        selectedKeys={[currentLanguage]}
        onAction={(key) => i18n.changeLanguage(key as string)}
      >
        <DropdownItem key="vi">Tiếng Việt</DropdownItem>
        <DropdownItem key="en">English</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default LanguageSwitcher;
