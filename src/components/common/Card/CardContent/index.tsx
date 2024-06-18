import Image from 'next/image';

import { ICON } from '@/constants/images';
import convertDate from '@/utils/convertDate';
import convertDuration from '@/utils/convertDuration';

interface CardContentProps {
  createdAt: string;
  description: string;
  pagePath: string;
  handleToggled: (target: string) => void;
}

const CardContent = ({ createdAt, description, pagePath, handleToggled }: CardContentProps) => {
  const handleTogglePopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleToggled('popover');
  };

  const createDuration = convertDuration(createdAt);
  const createDate = convertDate(createdAt);
  const onlyFolderPage = pagePath !== 'share';

  return (
    <div className='flex flex-col justify-between gap-[.625rem] px-5 py-[.9375rem] group-hover:bg-gray10'>
      <div className='relative flex justify-between'>
        <div className='text-sm text-gray60'>{createDuration}</div>
        <button className='p-1 hover:rounded-full hover:bg-gray20 hover:opacity-50' onClick={handleTogglePopover}>
          {onlyFolderPage && <Image src={ICON.KEBAB} alt='kebab' width={21} height={17} />}
        </button>
      </div>
      <p className='h-[3.0625rem] truncate'>{description}</p>
      <div className='text-sm'>{createDate}</div>
    </div>
  );
};

export default CardContent;
