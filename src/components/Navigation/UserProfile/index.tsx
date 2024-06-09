/* eslint-disable @next/next/no-img-element */
import useToggled from '@/hooks/useToggled';
import Popover from '@/components/common/Popover';
import { removeAccessToken } from '@/utils/apis/token';
import { loginStore } from '@/store/store';
import { useRouter } from 'next/router';
import { useUserStore } from '@/store/userStore';

const UserProfile = () => {
  const [isToggled, handleToggled] = useToggled({ popover: false });
  const { setIsLoggedIn } = loginStore();

  const route = useRouter();

  const setUserProfile = useUserStore(state => state.setUserProfile);
  const userProfile = useUserStore(state => state.userProfile);

  const handleLogout = () => {
    removeAccessToken();
    setIsLoggedIn(false);
    setUserProfile(null);
    route.push('/');
  };

  return (
    <button className='relative flex items-center gap-[.375rem]' onClick={() => handleToggled('popover')}>
      <img className='w-7 h-7 rounded-full' src={userProfile?.image_source} alt='profile' />
      <div className='text-sm'>{userProfile?.name}</div>
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
