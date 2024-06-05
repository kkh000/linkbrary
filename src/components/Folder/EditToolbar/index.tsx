import { ICON } from '@/constants/images';
import Image from 'next/image';

const EditToolbar = () => {
  return (
    <div className='flex gap-3'>
      <button className='flex gap-1'>
        <Image src={ICON.SHARE} alt='share' width={18} height={18} />
        <div className='text-sm text-gray60 font-semibold'>공유</div>
      </button>
      <button className='flex gap-1'>
        <Image src={ICON.CHANGE} alt='share' width={18} height={18} />
        <div className='text-sm text-gray60 font-semibold'>이름 변경</div>
      </button>
      <button className='flex gap-1'>
        <Image src={ICON.DELETE} alt='share' width={18} height={18} />
        <div className='text-sm text-gray60 font-semibold'>삭제</div>
      </button>
    </div>
  );
};

export default EditToolbar;
