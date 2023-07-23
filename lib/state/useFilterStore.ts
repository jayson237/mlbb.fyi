import { create } from "zustand";

interface FilterStore {
  filter: string;
  setFilter: (search: string) => void;
}

const useFilterStore = create<FilterStore>((set) => ({
  filter: "",
  setFilter: (search) => set(() => ({ filter: search })),
}));

export default useFilterStore;
