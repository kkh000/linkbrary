import usePortal from '@/hooks/usePortal';

const Spinner = () => {
  const createPortal = usePortal('spinner');
  return createPortal(
    <div className='z-99 fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-gray20 opacity-80'>
      <div className='border-gray-900 mr-3 inline-block h-5 w-5 animate-spin rounded-full border-b-2 border-t-2'></div>
    </div>
  );
};

export default Spinner;
