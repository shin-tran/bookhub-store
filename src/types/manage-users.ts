import type { UserDetail } from "./api";

export interface ActionsProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose?: () => void;
  user: UserDetail;
}

export interface InputFieldConfig {
  isDisabled?: boolean;
  isRequired?: boolean;
  name: string;
  label: string;
  type: "text" | "email" | "password" | "tel" | undefined;
  placeholder?: string;
  variant?: "flat" | "bordered" | "faded" | "underlined" | undefined;
  startContent?: React.ReactNode;
  defaultValue?: string | undefined;
}