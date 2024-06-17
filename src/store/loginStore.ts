import { create } from 'zustand';

import { getCookie, removeCookie } from '@/utils/apis/cookie';

interface LoginStore {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  checkLoginStatus: () => void;
}

const getInitialLoginState = () => {
  const token = getCookie('accessToken');
  return !!token;
};

const loginStore = create<LoginStore>(set => ({
  isLoggedIn: getInitialLoginState(),
  setIsLoggedIn: state => {
    if (!state) {
      removeCookie('accessToken');
    }
    set({ isLoggedIn: state });
  },
  checkLoginStatus: () => {
    const token = getCookie('accessToken');
    set({ isLoggedIn: !!token });
  },
}));

export default loginStore;
