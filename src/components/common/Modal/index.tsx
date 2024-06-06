// Modal.tsx

import { PropsWithChildren, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface ModalPortalProps {
  children: React.ReactNode;
}

const ModalPortal = ({ children }: PropsWithChildren<ModalPortalProps>) => {
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setElement(document.getElementById('portal'));
  }, []);

  if (!element) {
    return null;
  }

  return ReactDOM.createPortal(children, element);
};

interface ModalLayoutProps {
  handleModal: () => void;
  children: React.ReactNode;
}

const ModalLayout = ({ handleModal, children }: ModalLayoutProps) => {
  const handleClickInside = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  return (
    <ModalPortal>
      <div className='fixed top-0 left-0 right-0 bottom-0 z-50'>
        <div className='bg-gray100 opacity-60 fixed top-0 left-0 right-0 bottom-0' onClick={handleModal} />
        <div
          className=' bg-white  rounded-2xl flex flex-col absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
          onClick={handleClickInside}>
          {children}
        </div>
      </div>
    </ModalPortal>
  );
};

export default ModalLayout;
