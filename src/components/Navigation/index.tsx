import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { LOGO } from '@/constants/images';
import useClientSide from '@/hooks/useClientSide';
import loginStore from '@/store/loginStore';

import Button from '../common/Button';

import ToggleButton from './ToggleButton';
import UserProfile from './UserProfile';

const Navigation = () => {
  const { isLoggedIn } = loginStore();

  const route = useRouter();
  const pathname = route.pathname;

  const navigationPosition = pathname === '/' ? 'sticky left-0 right-0 top-0' : 'static';

  const isClient = useClientSide();

  return (
    <nav
      className={`${navigationPosition} flex items-center justify-between bg-[#f0f6ff] py-5 dark:bg-black mb:px-[1.875rem] tb:mx-auto tb:w-[50rem] pc:w-full pc:px-[12.5rem]`}>
      <Link href='/'>
        <Image
          className='mb:h-4 mb:w-[5.5rem] tb:h-[1.5rem] tb:w-[8.3125rem]'
          src={LOGO.LINKBRARY_LOGO}
          alt='linkbrary'
          width={133}
          height={24}
          priority
        />
      </Link>
      <div className='flex gap-10'>
        <ToggleButton />
        {isClient &&
          (isLoggedIn ? (
            <UserProfile />
          ) : (
            <Link href='/signin'>
              <Button className='mb:text-sm tb:text-lg' type='button'>
                로그인
              </Button>
            </Link>
          ))}
      </div>
    </nav>
  );
};

export default Navigation;
