import { create } from 'zustand';
import { getAccessToken, removeAccessToken } from '@/utils/apis/token';

interface StoreState {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  checkLoginStatus: () => void;
}

const getInitialLoginState = () => {
  const token = getAccessToken();
  return !!token;
};

export const loginStore = create<StoreState>(set => ({
  isLoggedIn: getInitialLoginState(),
  setIsLoggedIn: state => {
    if (!state) {
      removeAccessToken();
    }
    set({ isLoggedIn: state });
  },
  checkLoginStatus: () => {
    const token = getAccessToken();
    set({ isLoggedIn: !!token });
  },
}));
