import Link from 'next/link';

import SocialLink from './SocialLink';

const Footer = () => {
  return (
    <footer className='flex justify-between items-center px-[6.5rem] pt-8 pb-16 bg-black'>
      <div className='text-gray60'>@Codeit-2023</div>
      <div>
        <div className='flex justify-center gap-7'>
          <Link href='/prviacy'>
            <div className='text-gray20'>Privacy Policy</div>
          </Link>
          <Link href='/faq'>
            <div className='text-gray20'>FAQ</div>
          </Link>
        </div>
      </div>
      <SocialLink />
    </footer>
  );
};

export default Footer;
