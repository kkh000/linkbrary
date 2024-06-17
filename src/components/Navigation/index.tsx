import Image from 'next/image';
import Link from 'next/link';

import { LOGO } from '@/constants/images';
import useClientSide from '@/hooks/useClientSide';
import loginStore from '@/store/loginStore';

import Button from '../common/Button';

import UserProfile from './UserProfile';

const Navigation = () => {
  const { isLoggedIn } = loginStore();

  const isClient = useClientSide();

  return (
    <nav className='sticky top-0 flex items-center justify-between bg-[#f0f6ff] px-[12.5rem] py-5'>
      <Link href='/'>
        <Image src={LOGO.LINKBRARY_LOGO} alt='linkbrary' width={133} height={24} priority />
      </Link>
      {isClient &&
        (isLoggedIn ? (
          <UserProfile />
        ) : (
          <Link href='/signin'>
            <Button type='button'>로그인</Button>
          </Link>
        ))}
    </nav>
  );
};

export default Navigation;
