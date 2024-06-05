import Image from 'next/image';

import { ICON, IMAGE } from '@/constants/images';
import useToggled from '@/hooks/useToggled';
import Popover from '@/components/common/Popover';

const Card = () => {
  const [isToggled, handleToggled] = useToggled({ popvoer: false });

  return (
    <div className='relative flex flex-col w-[21.25rem] h-[20.875rem] shadow-md rounded-2xl '>
      <Image className='object-contain rounded-t-2xl ' src={IMAGE.NO_IMAGE} alt='none' width={340} height={280} />
      <div className='flex flex-col justify-between gap-[.625rem] px-5 py-[.9375rem]'>
        <div className='relative flex justify-between'>
          <div className='text-gray60 text-sm'>10분전</div>
          <button onClick={() => handleToggled('popover')}>
            <Image src={ICON.KEBAB} alt='kebab' width={21} height={17} />
          </button>
          {isToggled.popover && (
            <Popover firstTitle='삭제하기' secondTitle='폴더에 추가' position='top-[10px] right-[-100px]' />
          )}
        </div>
        <p className='overflow-hidden text-ellipsis h-[3.0625rem]'>
          Lorem ipsum dolor sit amet consectetur. Metus amet habitant nunc consequat. Tldkdasasas
        </p>
        <div className='text-sm'>date</div>
      </div>
      <Image
        className='absolute top-[15px] right-[15px] cursor-pointer'
        src={ICON.STAR}
        alt='star'
        width={34}
        height={34}
      />
    </div>
  );
};

export default Card;
