import { create } from "zustand";

interface ProfileTab {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}

const useProfileTab = create<ProfileTab>((set) => ({
  selectedTab: "",
  setSelectedTab: (tab: string) => set(() => ({ selectedTab: tab })),
}));

export default useProfileTab;
