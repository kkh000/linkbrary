import Image from 'next/image';
import Link from 'next/link';

import Button from '@/components/common/Button';
import ScrollController from '@/components/common/ScorllController';
import { IMAGE } from '@/constants/images';

import LandingTitle from './LandingTitle';

const LandingHeader = () => {
  return (
    <section className='flex flex-col items-center justify-center pt-7 text-center mb:gap-6 tb:gap-10 tb:pt-[2.5rem] pc:pt-[4.375rem] dark:bg-black'>
      <LandingTitle />
      <Link className='mb:w-[12.5rem] tb:w-[21.875rem]' href='/signup'>
        <Button size='mb:py-[.625rem] mb:px-4 tb:py-4 tb:px-5 w-full' type='button'>
          링크추가하기
        </Button>
      </Link>
      <Image
        className='mb:min-h-[11.125rem] mb:min-w-[18.75rem] tb:h-[23.9375rem] tb:w-[40.625rem] pc:h-[41.1875rem] pc:w-[69.875rem]'
        src={IMAGE.LANDING_HEADER}
        alt='hedaer'
        width={1118}
        height={659}
      />
      <ScrollController targetId='top' />
    </section>
  );
};

export default LandingHeader;
