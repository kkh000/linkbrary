import Image from 'next/image';
import { useRef, useState } from 'react';

import { ICON } from '@/constants/images';
import useAutoFocus from '@/hooks/useAutoFocus';

interface SearchInputProps {
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInput = ({ setSearchKeyword }: SearchInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const focusRef = useRef<HTMLInputElement>(null);

  useAutoFocus(focusRef);

  const handleKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value.trim();
    setSearchKeyword(keyword);
    setInputValue(keyword);
  };

  const handleResetKeyword = () => {
    setSearchKeyword('');
    setInputValue('');
  };

  const handleResetOnEsc = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      handleResetKeyword();
    }
  };

  const hasKeyword = inputValue.trim() !== '';

  return (
    <div className='flex items-center gap-[.625rem] px-4 py-[.9375rem] mb-10 rounded-xl bg-gray '>
      <Image src={ICON.SEARCH} alt='search' width={16} height={16} />
      <input
        className='w-full flex bg-gray placeholder:text-gray100'
        placeholder='링크를 검색해 보세요'
        onChange={handleKeyword}
        value={inputValue}
        onKeyDown={handleResetOnEsc}
        ref={focusRef}
      />
      {hasKeyword && (
        <button onClick={handleResetKeyword}>
          <Image src={ICON.CLOSE} alt='close' width={16} height={16} />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
