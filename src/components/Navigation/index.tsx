import Image from 'next/image';
import Link from 'next/link';

import { LOGO } from '@/constants/images';

import Button from '../common/Button';

const Navigation = () => {
  return (
    <nav className='sticky flex justify-between items-center px-[12.5rem] py-5'>
      <Link href='/'>
        <Image src={LOGO.LINKBRARY_LOGO} alt='linkbrary' width={133} height={24} priority />
      </Link>
      <Link href='/signin'>
        <Button type='button'>로그인</Button>
      </Link>
    </nav>
  );
};

export default Navigation;
