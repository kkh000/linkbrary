/* eslint-disable @next/next/no-img-element */
import useToggled from '@/hooks/useToggled';
import instance from '@/utils/apis/axios';
import { useEffect, useState } from 'react';
import Popover from '@/components/common/Popover';
import { removeAccessToken } from '@/utils/apis/token';
import { loginStore } from '@/store/store';
import { useRouter } from 'next/router';

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({ image_source: '', name: '' });
  const [isToggled, handleToggled] = useToggled({ popover: false });
  const { setIsLoggedIn } = loginStore();

  const route = useRouter();

  const getUserProfile = async () => {
    try {
      const response = await instance.get('/users');
      const result = response.data[0];
      setUserProfile(result);
    } catch (error) {}
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const handleLogout = () => {
    removeAccessToken();
    setIsLoggedIn(false);
    route.push('/');
  };

  return (
    <button className='relative flex items-center gap-[.375rem]' onClick={() => handleToggled('popover')}>
      <img className='w-7 h-7 rounded-full' src={userProfile.image_source} alt='profile' />
      <div className='text-sm'>{userProfile.name}</div>
      {isToggled.popover && (
        <Popover
          firstTitle='마이페이지'
          secondTitle='로그아웃'
          position='top-[40px] left-[-15px]'
          onClickSecondButton={handleLogout}
        />
      )}
    </button>
  );
};
export default UserProfile;
