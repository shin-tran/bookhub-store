import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useTheme } from "@heroui/use-theme";

interface ThemeToggleProps {
  variant?: "light" | "solid" | "bordered" | "ghost" | "shadow";
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

const ThemeToggle = ({
  variant = "light",
  size = "md",
  showLabel = true,
}: ThemeToggleProps) => {
  const { theme, setTheme } = useTheme();

  const themeIcons: Record<string, string> = {
    light: "solar:sun-bold",
    dark: "solar:moon-bold",
    system: "solar:monitor-bold",
  };

  const themeLabels: Record<string, string> = {
    light: "Light",
    dark: "Dark",
    system: "Auto",
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant={variant}
          size={size}
          startContent={<Icon icon={themeIcons[theme]} className="text-lg" />}
        >
          {showLabel && themeLabels[theme]}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Theme selection"
        selectedKeys={[theme]}
        onAction={(key) => setTheme(key as "light" | "dark" | "system")}
      >
        <DropdownItem key="light" startContent={<Icon icon="solar:sun-bold" />}>
          Light Mode
        </DropdownItem>
        <DropdownItem key="dark" startContent={<Icon icon="solar:moon-bold" />}>
          Dark Mode
        </DropdownItem>
        <DropdownItem
          key="system"
          startContent={<Icon icon="solar:monitor-bold" />}
        >
          Follow System
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ThemeToggle;
