import { create } from "zustand";

interface UIState {
  isPanelOpen: boolean;
  setIsPanelOpen: (isOpen: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isPanelOpen: true,
  setIsPanelOpen: (isOpen) => set({ isPanelOpen: isOpen })
}));
