import { create } from 'zustand';

interface UserProfile {
  id: number;
  name: string;
  image_source: string;
  email: string;
}

interface UserState {
  userProfile: UserProfile | null;
  setUserProfile: (userProfile: UserProfile | null) => void;
}

const initialState = {
  userProfile: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('userProfile') || 'null') : null,
};

export const useUserStore = create<UserState>(set => ({
  ...initialState,
  setUserProfile: userProfile => {
    set({ userProfile });
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  },
}));
