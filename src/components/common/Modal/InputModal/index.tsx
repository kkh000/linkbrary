import Image from 'next/image';

import { ICON } from '@/constants/images';
import useInput from '@/hooks/useInput';

import ModalLayout from '..';
import Button from '../../Button';

interface ModalProps {
  handleModal: () => void;
  title: string;
  children: React.ReactNode;
  placeholder: string;
  onClick: (value: string) => void;
}

const InputModal = ({ handleModal, title, children, placeholder, onClick }: ModalProps) => {
  const { value, onChange } = useInput('');

  return (
    <ModalLayout handleModal={() => handleModal}>
      <div className='relative flex w-[22.5rem] flex-col px-[2.5rem] py-8'>
        <h1 className='pb-6 text-center text-2xl font-bold'>{title}</h1>
        <input
          className='mb-[.9375rem] rounded-lg border border-gray20 px-[0.9375rem] py-[1.125rem] placeholder:text-gray60 focus-visible:border-2 focus-visible:border-primary'
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <Button type='button' onClick={() => onClick(value)}>
          {children}
        </Button>
        <button className='absolute right-[16px] top-[16px]' onClick={handleModal}>
          <Image src={ICON.CLOSE} alt='close' width={24} height={24} />
        </button>
      </div>
    </ModalLayout>
  );
};

export default InputModal;
