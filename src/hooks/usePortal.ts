import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const usePortal = (id: string) => {
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalElement(document.getElementById(id));
  }, [id]);

  const createPortal = (children: React.ReactNode) => {
    if (!portalElement) {
      return null;
    }
    return ReactDOM.createPortal(children, portalElement);
  };

  return createPortal;
};

export default usePortal;
