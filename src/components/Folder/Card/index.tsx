/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';

import { ICON, IMAGE } from '@/constants/images';
import useToggled from '@/hooks/useToggled';
import Popover from '@/components/common/Popover';

import convertDuration from '@/utils/convertDuration';
import convertDate from '@/utils/convertDate';
import Link from 'next/link';

interface CardProps {
  id: number;
  createdAt: string;
  url: string;
  description: string;
  image_source: string;
}

const Card = ({ id, createdAt, description, url, image_source }: CardProps) => {
  const [isToggled, handleToggled] = useToggled({ popvoer: false });

  const handleTogglePopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleToggled('popover');
  };

  return (
    <div key={id} className='relative'>
      <Link className='flex flex-col w-[21.25rem] h-[20.875rem] shadow-md rounded-2xl' href={url} target='_blank'>
        <img
          className='object-cover rounded-t-2xl w-[21.25rem] h-[17.5rem] overflow-hidden'
          src={image_source}
          onError={event => {
            (event.target as HTMLImageElement).src = IMAGE.NO_IMAGE;
          }}
          alt='none'
        />
        <div className='flex flex-col justify-between gap-[.625rem] px-5 py-[.9375rem]'>
          <div className='relative flex justify-between'>
            <div className='text-gray60 text-sm'>{convertDuration(createdAt)}</div>
            <button className='hover:bg-gray10 hover:opacity-50 p-1 hover:rounded-full ' onClick={handleTogglePopover}>
              <Image src={ICON.KEBAB} alt='kebab' width={21} height={17} />
            </button>
            {isToggled.popover && (
              <Popover
                firstTitle='삭제하기'
                // onClickFirstButton={}
                // onClickSecondButton={}
                secondTitle='폴더에 추가'
                position='top-[10px] right-[-100px]'
              />
            )}
          </div>
          <p className='truncate h-[3.0625rem]'>{description}</p>
          <div className='text-sm'>{convertDate(createdAt)}</div>
        </div>
      </Link>
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
