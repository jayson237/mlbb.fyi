import { create } from "zustand";

interface FilterStore {
  searchTerm: string;
  setSearchTerm: (search: string) => void;
}

const useSearchTermStore = create<FilterStore>((set) => ({
  searchTerm: "",
  setSearchTerm: (search) => set(() => ({ searchTerm: search })),
}));

export default useSearchTermStore;
