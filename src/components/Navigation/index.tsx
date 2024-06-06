import Image from 'next/image';
import Link from 'next/link';

import { LOGO } from '@/constants/images';

import Button from '../common/Button';
import { loginStore } from '@/store/store';
import UserProfile from './UserProfile';

const Navigation = () => {
  const { isLoggedIn } = loginStore();

  return (
    <nav className='sticky flex justify-between items-center px-[12.5rem] py-5'>
      <Link href='/'>
        <Image src={LOGO.LINKBRARY_LOGO} alt='linkbrary' width={133} height={24} priority />
      </Link>
      {isLoggedIn ? (
        <UserProfile />
      ) : (
        <Link href='/signin'>
          <Button type='button'>로그인</Button>
        </Link>
      )}
    </nav>
  );
};

export default Navigation;
