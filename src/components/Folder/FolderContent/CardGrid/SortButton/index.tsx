import { Dispatch, SetStateAction } from 'react';

interface SortButtonProps {
  setSortBy: Dispatch<SetStateAction<'latest' | 'favorite' | 'random'>>;
}

const SortButton = ({ setSortBy }: SortButtonProps) => {
  return (
    <div className='flex justify-start gap-10 pt-5'>
      <button onClick={() => setSortBy('latest')}>최신순</button>
      <button onClick={() => setSortBy('favorite')}>좋아요</button>
      <button onClick={() => setSortBy('random')}>랜덤</button>
    </div>
  );
};

export default SortButton;
