import { create } from "zustand";

interface ISignupStore {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  isConfirmVisible: boolean;
  setIsConfirmVisible: (visible: boolean) => void;
}

const useSignupStore = create<ISignupStore>((set) => ({
  isVisible: false,
  setIsVisible: (visible: boolean) =>
    set(() => ({
      isVisible: visible,
    })),
  isConfirmVisible: false,
  setIsConfirmVisible: (confirmVisible: boolean) =>
    set(() => ({
      isConfirmVisible: confirmVisible,
    })),
}));

export default useSignupStore;
