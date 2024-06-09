import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { loginStore } from '@/store/store';

const useRedirect = (path: string, requireLogin: boolean) => {
  const router = useRouter();
  const { isLoggedIn, checkLoginStatus } = loginStore();

  useEffect(() => {
    checkLoginStatus();
    if (requireLogin && !isLoggedIn) {
      router.push(path);
    }
    if (!requireLogin && isLoggedIn) {
      router.push(path);
    }
  }, [isLoggedIn, requireLogin, path, checkLoginStatus, router]);
};

export default useRedirect;
