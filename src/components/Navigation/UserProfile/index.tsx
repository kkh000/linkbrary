/* eslint-disable @next/next/no-img-element */
import useToggled from '@/hooks/useToggled';
import Popover from '@/components/common/Popover';
import { removeAccessToken } from '@/utils/apis/token';
import { loginStore } from '@/store/store';
import { useRouter } from 'next/router';

import { toast } from 'react-toastify';
import { useState } from 'react';
import Spinner from '@/components/common/Spinner/indext';
import { useQuery } from '@tanstack/react-query';
import { getUserData } from '@/utils/apis/folderApi';

const UserProfile = () => {
  const [isToggled, handleToggled] = useToggled({ popover: false });
  const [loading, setLoading] = useState(false);
  const { setIsLoggedIn } = loginStore();

  const route = useRouter();

  const notify = () => toast.success('로그아웃되었습니다!');

  const { data: userData } = useQuery({ queryKey: ['user'], queryFn: getUserData });

  const handleLogout = () => {
    setLoading(true);
    notify();

    setTimeout(() => {
      setIsLoggedIn(false);
      removeAccessToken();
      route.push('/');
      setLoading(false);
    }, 3000);
  };

  return (
    <div className='relative flex items-center gap-[.375rem]' onClick={() => handleToggled('popover')}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <img className='w-7 h-7 rounded-full' src={userData[0].image_source} alt='profile' />
          <div className='text-sm'>{userData[0].name}</div>
        </>
      )}
      {isToggled.popover && (
        <Popover
          firstTitle='마이페이지'
          secondTitle='로그아웃'
          position='top-[40px] left-[-15px]'
          onClickSecondButton={handleLogout}
          onClickFirstButton={() => route.push('/my-page')}
          closePopover={() => handleToggled('popover')}
        />
      )}
    </div>
  );
};
export default UserProfile;
