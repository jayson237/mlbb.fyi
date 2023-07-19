import { create } from "zustand";

interface OptionStore {
  selectedOption: number;
  setSelectedOption: (option: number) => void;
}

const useOptionStore = create<OptionStore>((set) => ({
  selectedOption: -3,
  setSelectedOption: (option) => set(() => ({ selectedOption: option })),
}));

export default useOptionStore;
