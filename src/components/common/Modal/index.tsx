import handleStopPropagtion from '@/utils/stopPropagation';
import usePortal from '@/hooks/usePortal';
import useLockScroll from '@/hooks/useScroll';

interface ModalLayoutProps {
  handleModal: () => void;
  children: React.ReactNode;
}

const ModalLayout = ({ handleModal, children }: ModalLayoutProps) => {
  const createPortal = usePortal('portal');
  useLockScroll();

  return createPortal(
    <div className='fixed top-0 left-0 right-0 bottom-0 z-50'>
      <div className='bg-gray100 opacity-60 fixed top-0 left-0 right-0 bottom-0' onClick={handleModal} />
      <div
        className=' bg-white  rounded-2xl flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
        onClick={handleStopPropagtion}>
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
