import { create } from "zustand";

interface SearchStore {
  searchTerm: string;
  setSearchTerm: (search: string) => void;
}

const useSearchStore = create<SearchStore>((set) => ({
  searchTerm: "",
  setSearchTerm: (search) => set(() => ({ searchTerm: search })),
}));

export default useSearchStore;
