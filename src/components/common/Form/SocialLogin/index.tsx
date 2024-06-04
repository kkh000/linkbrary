import Image from 'next/image';

import { LOGO } from '@/constants/images';

interface SocialLoginProps {
  title: string;
}

const SocialLogin = ({ title }: SocialLoginProps) => {
  return (
    <div className='w-[25rem] flex justify-between items-center py-3 px-6 rounded-lg bg-gray10'>
      <div className='text-sm'>{title}</div>
      <div className='flex gap-4'>
        <button type='button'>
          <Image src={LOGO.GOOGLE_LOGIN} alt='logo' width={42} height={42} />
        </button>
        <button type='button'>
          <Image src={LOGO.KAKAO_LOGIN} alt='logo' width={42} height={42} />
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
