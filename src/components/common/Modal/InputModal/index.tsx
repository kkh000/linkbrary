import Image from 'next/image';

import { ICON } from '@/constants/images';
import ModalLayout from '..';
import Button from '../../Button';

interface ModalProps {
  handleModal: () => void;
  title: string;
  children: React.ReactNode;
  placeholder: string;
}

const InputModal = ({ handleModal, title, children, placeholder }: ModalProps) => {
  return (
    <ModalLayout handleModal={() => handleModal}>
      <div className='relative flex flex-col  w-[22.5rem] px-[2.5rem] py-8'>
        <h1 className='text-center text-2xl font-bold pb-6'>{title}</h1>
        <input
          className='py-[1.125rem] px-[0.9375rem] placeholder:text-gray60 border border-gray20 rounded-lg mb-[.9375rem]'
          placeholder={placeholder}
        />
        <Button type='button'>{children}</Button>
        <button className='absolute top-[16px] right-[16px]' onClick={handleModal}>
          <Image src={ICON.CLOSE} alt='close' width={24} height={24} />
        </button>
      </div>
    </ModalLayout>
  );
};

export default InputModal;
