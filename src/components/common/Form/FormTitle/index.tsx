import Image from 'next/image';
import Link from 'next/link';

import { LOGO } from '@/constants/images';

interface FormTitleProps {
  question: string;
  linkMessage: string;
  path: string;
}

const FormTitle = ({ question, linkMessage, path }: FormTitleProps) => {
  return (
    <div className='flex flex-col items-center gap-4'>
      <Link href='/'>
        <Image src={LOGO.LINKBRARY_LOGO} alt='logo' width={210} height={38} priority />
      </Link>
      <div className='flex  justify-center items-center gap-2'>
        <p>{question}</p>
        <Link href={path ?? ''}>
          <div className='font-bold text-primary border-b border-b-primary'>{linkMessage}</div>
        </Link>
      </div>
    </div>
  );
};

export default FormTitle;
