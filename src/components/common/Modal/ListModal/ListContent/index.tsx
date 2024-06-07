import Image from 'next/image';
import useToggled from '@/hooks/useToggled';
import { FolderListItem } from '@/types/folderListType';
import { ICON } from '@/constants/images';

interface ListContentProps {
  folderList?: FolderListItem[];
}

const ListContent = ({ folderList }: ListContentProps) => {
  const [isToggled, handelToggeld] = useToggled({});
  return (
    <ul className='flex flex-col gap-1 pb-6'>
      {folderList?.map(item => (
        <li
          className={`flex items-center justify-between p-2 rounded-lg hover:bg-gray10 cursor-pointer ${isToggled[item.id] && 'bg-gray10 text-primary'}`}
          key={item.id}
          onClick={() => handelToggeld(String(item.id))}>
          <div className='flex items-center gap-2'>
            <div className='text-gray100 '>{item.name}</div>
            <div className='text-sm text-gray60'>{`${item.link_count}개 링크`}</div>
          </div>
          {isToggled[item.id] && <Image src={ICON.CHECK} alt='check' width={14} height={14} />}
        </li>
      ))}
    </ul>
  );
};

export default ListContent;
