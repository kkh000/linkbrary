import usePortal from '@/hooks/usePortal';
import useLockScroll from '@/hooks/useScroll';
import handleStopPropagtion from '@/utils/stopPropagation';

interface ModalLayoutProps {
  handleModal: () => void;
  children: React.ReactNode;
}

const ModalLayout = ({ handleModal, children }: ModalLayoutProps) => {
  const createPortal = usePortal('portal');
  useLockScroll();

  return createPortal(
    <div className='fixed bottom-0 left-0 right-0 top-0 z-50'>
      <div className='fixed bottom-0 left-0 right-0 top-0 bg-gray100 opacity-60' onClick={handleModal} />
      <div
        className='absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col rounded-2xl bg-white'
        onClick={handleStopPropagtion}>
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
