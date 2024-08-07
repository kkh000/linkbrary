import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';

import Popover from '@/components/common/Popover';
import Spinner from '@/components/common/Spinner/indext';
import useToggled from '@/hooks/useToggled';
import loginStore from '@/store/loginStore';
import { getCookie, removeCookie } from '@/utils/apis/cookie';
import { getUserData } from '@/utils/apis/folderApi';

const UserProfile = () => {
  const [isToggled, handleToggled] = useToggled({ popover: false });
  const [loading, setLoading] = useState(false);
  const { setIsLoggedIn } = loginStore();

  const route = useRouter();

  const { data: userData } = useQuery({ queryKey: ['user'], queryFn: getUserData });

  const handleLogout = () => {
    setLoading(true);
    toast.success('로그아웃되었습니다!');

    setTimeout(() => {
      setIsLoggedIn(false);
      removeCookie('accessToken');
      route.push('/');
      setLoading(false);
    }, 1000);
  };

  const token = getCookie('accessToken');

  console.log(token);

  return (
    <button className='relative flex items-center gap-[.375rem]' onClick={() => handleToggled('popover')}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <img className='h-7 w-7 rounded-full' src={userData?.[0]?.image_source} alt='profile' />
          <div className='text-sm'>{userData?.[0]?.name}</div>
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
