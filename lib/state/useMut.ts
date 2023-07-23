import { create } from "zustand";

interface Mutate {
  toogleMutate: boolean;
  togMut: () => void;
  clamMut: () => void;
}

const useMut = create<Mutate>((set) => ({
  toogleMutate: false,
  togMut: () => set({ toogleMutate: true }),
  clamMut: () => set({ toogleMutate: false }),
}));

export default useMut;
