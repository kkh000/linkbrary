import usePortal from '@/hooks/usePortal';
import { createPortal } from 'react-dom';

const Spinner = () => {
  const createPortal = usePortal('spinner');
  return createPortal(
    <div className='fixed top-0 left-0 w-screen h-screen bg-gray20 opacity-80 flex justify-center items-center z-99 '>
      <div className='inline-block animate-spin rounded-full border-t-2 border-b-2 border-gray-900 h-5 w-5 mr-3'></div>
    </div>
  );
};

export default Spinner;
