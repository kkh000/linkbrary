import Image from 'next/image';

import { IMAGE } from '@/constants/images';

const LandingMain = () => {
  return (
    <section className='flex flex-col justify-center items-center gap-[6.25rem] pt-[7.5rem] pb-[10.625rem] bg-white'>
      <article className='flex justify-center items-center gap-[9.8125rem]'>
        <div className='flex flex-col gap-[.625rem]'>
          <h2 className='text-5xl font-bold'>
            원하는 링크를
            <br /> 저장하세요
          </h2>
          <p className='text-gray60'>
            나중에 읽고 싶은 글, 다시 보고 싶은 영상,
            <br /> 사고 싶은 옷, 기억하고 싶은 모든 것을
            <br /> 한 공간에 저장하세요.
          </p>
        </div>
        <Image src={IMAGE.LANDING_LINK} alt='link' width={550} height={450} />
      </article>
      <article className='flex justify-center items-center gap-[9.8125rem]'>
        <Image src={IMAGE.LANDING_MANAGE} alt='link' width={550} height={450} />
        <div className='flex flex-col gap-[.625rem]'>
          <h2 className='text-5xl font-bold'>
            링크를 폴더로
            <br /> 관리하세요
          </h2>
          <p className='text-gray60'>
            나만의 폴더를 무제한으로 만들고
            <br /> 다양하게 활용할 수 있습니다.
          </p>
        </div>
      </article>
      <article className='flex justify-center items-center gap-[9.8125rem]'>
        <div className='flex flex-col gap-[.625rem]'>
          <h2 className='text-5xl font-bold'>
            저장한 링크를
            <br /> 공유해 보세요
          </h2>
          <p className='text-gray60'>
            여러 링크를 폴더에 담고 공유할 수 있습니다.
            <br /> 가족, 친구, 동료들에게 쉽고 빠르게 링크를
            <br /> 공유해 보세요.
          </p>
        </div>
        <Image src={IMAGE.LANDING_SHARE} alt='link' width={550} height={450} />
      </article>
      <article className='flex justify-center items-center gap-[9.8125rem]'>
        <Image src={IMAGE.LANDING_SEARCH} alt='link' width={550} height={450} />
        <div className='flex flex-col gap-[.625rem]'>
          <h2 className='text-5xl font-bold'>
            저장한 링크를
            <br /> 검색해 보세요
          </h2>
          <p className='text-gray60'>중요한 정보들을 검색으로 쉽게 찾아보세요.</p>
        </div>
      </article>
    </section>
  );
};

export default LandingMain;
