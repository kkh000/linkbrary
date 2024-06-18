import Image from 'next/image';

import { ICON } from '@/constants/images';

import ModalLayout from '..';
import Button from '../../Button';

interface ModalProps {
  handleModal: () => void;
  title: string;
  children: React.ReactNode;
  content: string;
  onClick: () => void;
}

const DeleteModal = ({ handleModal, title, content, children, onClick }: ModalProps) => {
  return (
    <ModalLayout handleModal={() => handleModal}>
      <div className='relative flex w-[22.5rem] flex-col px-[2.5rem] py-8'>
        <h1 className='pb-2 text-center text-2xl font-bold'>{title}</h1>
        <p className='pb-6 text-center text-sm text-gray60'>{content}</p>
        <Button type='button' color='bg-red' onClick={onClick}>
          {children}
        </Button>
        <button className='absolute right-[16px] top-[16px]' onClick={handleModal}>
          <Image src={ICON.CLOSE} alt='close' width={24} height={24} />
        </button>
      </div>
    </ModalLayout>
  );
};

export default DeleteModal;
