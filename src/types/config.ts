import type { BookDetail, UserDetail } from "./api";

export interface BaseActionsProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose?: () => void;
}

export interface UserActionsProps extends BaseActionsProps {
  user: UserDetail;
}

export interface BookActionsProps extends BaseActionsProps {
  book: BookDetail;
}

export interface InputFieldConfig {
  name: string;
  label: string;
  type?: "text" | "email" | "password" | "tel";
  placeholder?: string;
  variant?: "flat" | "bordered" | "faded" | "underlined";
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  defaultValue?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
}
