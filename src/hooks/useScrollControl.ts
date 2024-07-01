import { useState, useEffect } from 'react';

interface useScorllControlProps {
  targetId: string;
  position?: number;
}

const useScorllControl = ({ targetId, position = 1 }: useScorllControlProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScorllToTop = () => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const scrollVisiblePosition = () => {
      const visiblePosition = window.scrollY > window.innerHeight * position;
      setIsVisible(visiblePosition);
    };

    window.addEventListener('scroll', scrollVisiblePosition);

    return () => {
      window.removeEventListener('scroll', scrollVisiblePosition);
    };
  }, [position]);

  return { isVisible, handleScorllToTop };
};

export default useScorllControl;
