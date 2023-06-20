import { create } from "zustand";

interface HeroFilterStore {
  toogleMutate: boolean;
  togMut: () => void;
  clamMut: () => void;
}

const useMutCom = create<HeroFilterStore>((set) => ({
  toogleMutate: false,
  togMut: () => set({ toogleMutate: true }),
  clamMut: () => set({ toogleMutate: false }),
}));

export default useMutCom;
