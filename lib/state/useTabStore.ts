import { create } from "zustand";

interface TabStore {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

const useTabStore = create<TabStore>((set) => ({
  selectedTab: "",
  setSelectedTab: (tab) => set(() => ({ selectedTab: tab })),
}));

export default useTabStore;
