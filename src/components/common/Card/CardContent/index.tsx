import Image from 'next/image';
import convertDuration from '@/utils/convertDuration';
import convertDate from '@/utils/convertDate';
import { ICON } from '@/constants/images';

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
        <div className='text-gray60 text-sm'>{createDuration}</div>
        <button className='hover:bg-gray20 hover:opacity-50 p-1 hover:rounded-full ' onClick={handleTogglePopover}>
          {onlyFolderPage && <Image src={ICON.KEBAB} alt='kebab' width={21} height={17} />}
        </button>
      </div>
      <p className='truncate h-[3.0625rem]'>{description}</p>
      <div className='text-sm'>{createDate}</div>
    </div>
  );
};

export default CardContent;
