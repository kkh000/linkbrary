import Image from 'next/image';
import Button from '@/components/common/Button';
import { ICON } from '@/constants/images';

const AddFolderInput = () => {
  return (
    <header className='flex justify-center w-full pt-[3.75rem] pb-[5.625rem]'>
      <div className='flex gap-3 w-[50rem] py-4 px-5 bg-white rounded-2xl border-primary border'>
        <Image src={ICON.LINK} alt='link' width={20} height={20} />
        <input className='flex  w-full' />
        <div className='w-[130px]'>
          <Button type='button'>추가하기</Button>
        </div>
      </div>
    </header>
  );
};

export default AddFolderInput;
