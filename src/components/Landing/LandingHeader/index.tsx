import Image from 'next/image';
import Link from 'next/link';

import Button from '@/components/common/Button';
import { IMAGE } from '@/constants/images';

import LandingTitle from './LandingTitle';

const LandingHeader = () => {
  return (
    <section className='tb:pt-[2.5rem] pc:pt-[4.375rem] tb:gap-10 mb:gap-6 flex flex-col items-center justify-center pt-7 text-center'>
      <LandingTitle />
      <Link className='mb:w-[12.5rem] tb:w-[21.875rem]' href='/signup'>
        <Button type='button'>링크추가하기</Button>
      </Link>
      <Image
        className='mb:min-w-[18.75rem] mb:min-h-[11.125rem] tb:w-[40.625rem] tb:h-[23.9375rem] pc:w-[69.875rem] pc:h-[41.1875rem]'
        src={IMAGE.LANDING_HEADER}
        alt='hedaer'
        width={1118}
        height={659}
      />
    </section>
  );
};

export default LandingHeader;
