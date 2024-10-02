import { create } from "zustand";

type MessengerStore = {
    selectedProject: number | null;
    setSelectedProject: (_value: number) => void;
};

export const useCompanyDetailsStore = create<MessengerStore>((set) => ({
    selectedProject: null,
    setSelectedProject: (selectedProject) => set({ selectedProject }),
}));
