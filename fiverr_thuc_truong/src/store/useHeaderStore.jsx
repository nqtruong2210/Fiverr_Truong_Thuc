import { create } from 'zustand';

export const useHeaderStore = create((set) => ({
  sticky: true,
  searchQuery: '',
  setSticky: () => set(() => ({ sticky: true })),
  setUnSticky: () => set(() => ({ sticky: false })),
  setSearchQuery: (value) => set(() => ({ searchQuery: value })),
}));
