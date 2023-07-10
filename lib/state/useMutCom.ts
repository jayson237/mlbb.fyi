import { create } from "zustand";

interface MutateComment {
  toogleMutate: boolean;
  togMut: () => void;
  clamMut: () => void;
}

const useMutCom = create<MutateComment>((set) => ({
  toogleMutate: false,
  togMut: () => set({ toogleMutate: true }),
  clamMut: () => set({ toogleMutate: false }),
}));

export default useMutCom;
