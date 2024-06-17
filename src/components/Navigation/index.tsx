import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { LOGO } from '@/constants/images';
import useClientSide from '@/hooks/useClientSide';
import loginStore from '@/store/loginStore';

import Button from '../common/Button';

import UserProfile from './UserProfile';

const Navigation = () => {
  const { isLoggedIn } = loginStore();

  const route = useRouter();
  const pathname = route.pathname;

  const navigationPosition = pathname === '/' ? 'sticky left-0 right-0 top-0' : 'static';

  const isClient = useClientSide();

  return (
    <nav
      className={`${navigationPosition} pc:px-[12.5rem] pc:w-full tb:w-[50rem] tb:mx-auto mb:px-[1.875rem] flex items-center justify-between bg-[#f0f6ff] py-5`}>
      <Link href='/'>
        <Image
          className='tb:w-[8.3125rem] tb:h-[1.5rem] mb:w-[5.5rem] mb:h-4'
          src={LOGO.LINKBRARY_LOGO}
          alt='linkbrary'
          width={133}
          height={24}
          priority
        />
      </Link>
      {isClient &&
        (isLoggedIn ? (
          <UserProfile />
        ) : (
          <Link href='/signin'>
            <Button className='tb:text-lg mb:text-sm' type='button'>
              로그인
            </Button>
          </Link>
        ))}
    </nav>
  );
};

export default Navigation;
