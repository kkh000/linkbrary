import Image from 'next/image';

import { IMAGE } from '@/constants/images';

const gradientStyle = {
  roseToBlue: 'bg-gradient-to-r from-rose-400 to-blue-500 bg-clip-text text-transparent',
  skyToSky: 'bg-gradient-to-r from-sky-400 to-sky-200 bg-clip-text text-transparent',
  violetToViolet: 'bg-gradient-to-r from-violet-300 to-violet-400 bg-clip-text text-transparent',
  blueToEmerald: 'bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent',
};

const gridStyle = {
  base: {
    article: 'tb:grid pc:gap-x-[9.8125rem] tb:gap-x-[3.1875rem] tb:gap-y-[.625rem] tb:px-auto flex flex-col gap-5 px-8',
    title: 'tb:text-5xl font-bold text-2xl dark:text-white',
    image: 'pc:w-[34.375rem] pc:h-[28.125rem] tb:w-[24.0625rem] tb:h-[19.6875rem]',
  },
  oddIndex: {
    article: 'tb:grid-cols-[291px,1fr] tb:grid-rows-2',
    title: 'tb:col-span-1 tb:row-span-1 tb:self-end ',
    description: 'tb:col-span-1 tb:row-span-1 tb:row-start-2',
    image: 'tb:col-span-1 tb:col-start-2 tb:row-span-2',
  },
  evenIndex: {
    article: 'tb:grid-cols-[1fr, 291px] tb:grid-rows-2',
    title: 'tb:col-span-1 tb:row-span-1 tb:col-start-2 tb:self-end tb:text-right',
    description: 'tb:col-span-1 tb:row-span-1 tb:col-start-2 tb:row-start-2 tb:text-right ',
    image: 'tb:col-span-1 tb:row-span-2 tb:row-start-1',
  },
};

const LandingMain = () => {
  return (
    <section className='flex flex-col items-center justify-center gap-[5rem] bg-white pb-[10.625rem] dark:bg-black mb:pt-[2.5rem] tb:gap-[6.25rem] tb:pt-[5rem] pc:gap-[7.5rem] pc:pt-[7.5rem]'>
      <article className={`${gridStyle.oddIndex.article} ${gridStyle.base.article}`}>
        <h2 className={`${gridStyle.oddIndex.title} ${gridStyle.base.title} `}>
          <span className={`${gradientStyle.roseToBlue}`}>원하는 링크</span>
          를
          <br className='hidden tb:block' /> 저장하세요
        </h2>
        <Image
          className={`${gridStyle.oddIndex.image} ${gridStyle.base.image}`}
          src={IMAGE.LANDING_LINK}
          alt='link'
          width={550}
          height={450}
        />
        <p className={`${gridStyle.oddIndex.description} text-gray60`}>
          나중에 읽고 싶은 글, 다시 보고 싶은 영상,
          <br className='hidden tb:block' /> 사고 싶은 옷, <br className='mb:block tb:hidden' /> 기억하고 싶은 모든 것을
          <br className='hidden tb:block' /> 한 공간에 저장하세요.
        </p>
      </article>
      <article className={`${gridStyle.evenIndex.article} ${gridStyle.base.article}`}>
        <h2 className={`${gridStyle.evenIndex.title} ${gridStyle.base.title} `}>
          링크를 폴더로
          <br className='hidden tb:block' />
          <span className={`${gradientStyle.skyToSky}`}>관리</span>
          하세요
        </h2>
        <Image
          className={`${gridStyle.evenIndex.image} ${gridStyle.base.image}`}
          src={IMAGE.LANDING_MANAGE}
          alt='link'
          width={550}
          height={450}
        />
        <p className={`${gridStyle.evenIndex.description} text-gray60`}>
          나만의 폴더를 무제한으로 만들고
          <br className='hidden tb:block' /> 다양하게 활용할 수 있습니다.
        </p>
      </article>
      <article className={`${gridStyle.oddIndex.article} ${gridStyle.base.article}`}>
        <h2 className={`${gridStyle.oddIndex.title} ${gridStyle.base.title}`}>
          저장한 링크를
          <br className='hidden tb:block' />
          <span className={`${gradientStyle.violetToViolet}`}>공유</span>해 보세요
        </h2>
        <Image
          className={`${gridStyle.oddIndex.image} ${gridStyle.base.image}`}
          src={IMAGE.LANDING_SHARE}
          alt='link'
          width={550}
          height={450}
        />
        <p className={`${gridStyle.oddIndex.description} text-gray60`}>
          여러 링크를 폴더에 담고 공유할 수 있습니다.
          <br className='hidden tb:block' /> 가족, <br className='mb:block tb:hidden' />
          친구, 동료들에게 쉽고 빠르게 링크를
          <br className='hidden tb:block' /> 공유해 보세요.
        </p>
      </article>
      <article className={`${gridStyle.evenIndex.article} ${gridStyle.base.article}`}>
        <h2 className={`${gridStyle.evenIndex.title} ${gridStyle.base.title}`}>
          저장한 링크를
          <br className='hidden tb:block' />
          <span className={`${gradientStyle.blueToEmerald}`}>검색</span>해 보세요
        </h2>
        <Image
          className={`${gridStyle.evenIndex.image} ${gridStyle.base.image}`}
          src={IMAGE.LANDING_SEARCH}
          alt='link'
          width={550}
          height={450}
        />
        <p className={`${gridStyle.oddIndex.description} text-gray60`}>중요한 정보들을 검색으로 쉽게 찾아보세요.</p>
      </article>
    </section>
  );
};

export default LandingMain;
