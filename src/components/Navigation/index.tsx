import loginStore from '@/store/loginStore';
import Link from 'next/link';
import Image from 'next/image';
import Button from '../common/Button';
import UserProfile from './UserProfile';
import { LOGO } from '@/constants/images';
import useClientSide from '@/hooks/useClientSide';

const Navigation = () => {
  const { isLoggedIn } = loginStore();

  const isClient = useClientSide();

  return (
    <nav className='sticky flex justify-between items-center px-[12.5rem] py-5'>
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
