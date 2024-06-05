import Image from 'next/image';

import { ICON } from '@/constants/images';

const AddFolderButton = () => {
  return (
    <button className='flex items-center  gap-1'>
      <span className=' font-medium text-primary'>폴더추가</span>
      <Image src={ICON.PLUS} alt='plus' width={16} height={160} />
    </button>
  );
};

export default AddFolderButton;
