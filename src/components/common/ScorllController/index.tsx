import Image from 'next/image';

import { ICON } from '@/constants/images';
import useScorllControl from '@/hooks/useScrollControl';

interface ScrollControllerProps {
  targetId: string;
}

const ScrollController = ({ targetId }: ScrollControllerProps) => {
  const { isVisible, handleScorllToTop } = useScorllControl({ targetId, position: 0 });

  return (
    <>
      {isVisible && (
        <div className='flex` fixed bottom-12 right-6 h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-primary'>
          <button onClick={handleScorllToTop} className='p-3 transition duration-300'>
            <Image src={ICON.ARROW_UP} alt='up' width={40} height={40} />
          </button>
        </div>
      )}
    </>
  );
};

export default ScrollController;
