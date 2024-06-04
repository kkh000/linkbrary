import Image from 'next/image';
import Link from 'next/link';

import Button from '@/components/common/Button';
import { IMAGE } from '@/constants/images';

const LandingHeader = () => {
  return (
    <section className='flex flex-col justify-center items-center pt-[4.375rem] px-[22.5rem] gap-10 text-center'>
      <h1 className='text-[4rem] font-bold'>
        <span>세상의 모든 정보</span>를<br /> 쉽게 저장하고 관리해 보세요
      </h1>
      <Link href='/signup'>
        <Button type='button'>링크추가하기</Button>
      </Link>
      <Image src={IMAGE.LANDING_HEADER} alt='hedaer' width={1118} height={659} />
    </section>
  );
};

export default LandingHeader;
