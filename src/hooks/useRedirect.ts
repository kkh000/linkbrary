import { useRouter } from 'next/router';
import { useEffect } from 'react';

import loginStore from '@/store/loginStore';

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
