import { create } from "zustand";

type LoginModal = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useLoginModal = create<LoginModal>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));