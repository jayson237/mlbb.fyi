import { create } from "zustand";

interface TagStore {
  searchTag: string;
  setSearchTag: (search: string) => void;
}

const useTagStore = create<TagStore>((set) => ({
  searchTag: "",
  setSearchTag: (search) => set(() => ({ searchTag: search })),
}));

export default useTagStore;
