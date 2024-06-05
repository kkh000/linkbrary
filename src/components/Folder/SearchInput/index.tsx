import Image from 'next/image';

import { ICON } from '@/constants/images';

const SearchInput = () => {
  return (
    <div className='flex items-center gap-[.625rem] px-4 py-[.9375rem] mb-10 rounded-xl bg-gray '>
      <button>
        <Image src={ICON.SEARCH} alt='search' width={16} height={16} />
      </button>
      <input className='w-full flex bg-gray placeholder:text-gray100' placeholder='링크를 검색해 보세요' />
      <button>
        <Image src={ICON.CLOSE} alt='close' width={16} height={16} />
      </button>
    </div>
  );
};

export default SearchInput;
