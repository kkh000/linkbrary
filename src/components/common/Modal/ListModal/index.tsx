import Image from 'next/image';

import { ICON } from '@/constants/images';
import ModalLayout from '..';
import Button from '../../Button';
import { FolderListItem } from '@/types/folderListType';

import ListContent from './ListContent';

interface ModalProps {
  handleModal: () => void;
  title: string;
  children: React.ReactNode;
  content: string;
  folderList?: FolderListItem[];
}

const ListModal = ({ handleModal, title, children, content, folderList }: ModalProps) => {
  return (
    <ModalLayout handleModal={() => handleModal}>
      <div className='relative flex flex-col  w-[23.75rem] px-[2.5rem] py-8'>
        <h1 className='text-center text-2xl font-bold pb-6'>{title}</h1>
        <p className='text-center text-sm text-gray60 pb-6'>{content}</p>
        <ListContent folderList={folderList} />
        <Button type='button'>{children}</Button>
        <button className='absolute top-[16px] right-[16px]' onClick={handleModal}>
          <Image src={ICON.CLOSE} alt='close' width={24} height={24} />
        </button>
      </div>
    </ModalLayout>
  );
};

export default ListModal;
