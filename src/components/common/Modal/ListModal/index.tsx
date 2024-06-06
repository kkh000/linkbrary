import Image from 'next/image';

import { ICON } from '@/constants/images';
import ModalLayout from '..';
import Button from '../../Button';
import { FolderListItem } from '@/types/folderListType';
import useToggled from '@/hooks/useToggled';

interface ModalProps {
  handleModal: () => void;
  title: string;
  children: React.ReactNode;
  content: string;
  folderList: FolderListItem[];
}

const ListModal = ({ handleModal, title, children, content, folderList }: ModalProps) => {
  const [isToggled, handelToggeld] = useToggled({});

  return (
    <ModalLayout handleModal={() => handleModal}>
      <div className='relative flex flex-col  w-[23.75rem] px-[2.5rem] py-8'>
        <h1 className='text-center text-2xl font-bold pb-6'>{title}</h1>
        <p className='text-center text-sm text-gray60 pb-6'>{content}</p>
        <ul className='flex flex-col gap-1 pb-6'>
          {folderList &&
            folderList.map(item => (
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
        <Button type='button'>{children}</Button>
        <button className='absolute top-[16px] right-[16px]' onClick={handleModal}>
          <Image src={ICON.CLOSE} alt='close' width={24} height={24} />
        </button>
      </div>
    </ModalLayout>
  );
};

export default ListModal;
