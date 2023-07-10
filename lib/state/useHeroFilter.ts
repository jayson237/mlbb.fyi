import { create } from "zustand";

interface HeroFilterStore {
  type: string[];
  role: string[];
  change: (data: { type: string[]; role: string[] }) => void;
}

const useHeroFilter = create<HeroFilterStore>((set) => ({
  type: [],
  role: [],
  change: (data: { type: string[]; role: string[] }) =>
    set(() => ({ type: data.type, role: data.role })),
}));

export default useHeroFilter;
