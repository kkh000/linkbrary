import { create } from 'zustand';

interface StoreState {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const loginStore = create<StoreState>(set => ({
  isLoggedIn: false,
  setIsLoggedIn: state => {
    set(() => ({ isLoggedIn: state }));
  },
}));
