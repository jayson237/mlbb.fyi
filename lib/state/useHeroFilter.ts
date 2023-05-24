import { create } from 'zustand';

interface HeroFilterStore {
  type: string[];
  change: (data: string[]) => void
}

const useHeroFilter = create<HeroFilterStore>((set) => ({
  type: [],
  change: (data: string[]) => set(() => ({ type: data })),
}));


export default useHeroFilter;