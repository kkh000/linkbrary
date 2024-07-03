import Image from 'next/image';
import { useTheme } from 'next-themes';

import { ICON } from '@/constants/images';
import useClientSide from '@/hooks/useClientSide';

const ToggleButton = () => {
  const { theme, setTheme } = useTheme();
  const isClient = useClientSide();

  if (!isClient) {
    return null;
  }

  const isDarkMode = theme === 'dark';
  return (
    <button type='button' onClick={() => setTheme(isDarkMode ? 'light' : 'dark')} className='dark:text-white'>
      <Image src={isDarkMode ? ICON.LIGHT : ICON.DARK} alt='light' width={20} height={20} />
    </button>
  );
};

export default ToggleButton;
