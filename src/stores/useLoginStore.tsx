import { create } from "zustand";

interface ISignupStore {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
}

const useLoginStore = create<ISignupStore>((set) => ({
  isVisible: false,
  setIsVisible: (visible: boolean) =>
    set(() => ({
      isVisible: visible,
    })),
}));
export default useLoginStore;
