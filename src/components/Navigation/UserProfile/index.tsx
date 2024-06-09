/* eslint-disable @next/next/no-img-element */
import useToggled from '@/hooks/useToggled';
import Popover from '@/components/common/Popover';
import { removeAccessToken } from '@/utils/apis/token';
import { loginStore } from '@/store/store';
import { useRouter } from 'next/router';
import { useUserStore } from '@/store/userStore';
import { toast } from 'react-toastify';
import { useState } from 'react';
import Spinner from '@/components/common/Spinner/indext';

const UserProfile = () => {
  const [isToggled, handleToggled] = useToggled({ popover: false });
  const [loading, setLoading] = useState(false);
  const { setIsLoggedIn } = loginStore();

  const route = useRouter();

  const setUserProfile = useUserStore(state => state.setUserProfile);
  const userProfile = useUserStore(state => state.userProfile);

  const notify = () => toast.success('로그아웃되었습니다!');

  const handleLogout = () => {
    setLoading(true);
    notify();

    setTimeout(() => {
      setUserProfile(null);
      setIsLoggedIn(false);
      removeAccessToken();
      route.push('/');
      setLoading(false);
    }, 3000);
  };

  return (
    <button className='relative flex items-center gap-[.375rem]' onClick={() => handleToggled('popover')}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <img className='w-7 h-7 rounded-full' src={userProfile?.image_source} alt='profile' />
          <div className='text-sm'>{userProfile?.name}</div>
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
    </button>
  );
};
export default UserProfile;
