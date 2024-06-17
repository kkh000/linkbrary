import Link from 'next/link';

import SocialLink from './SocialLink';

const Footer = () => {
  return (
    <footer className='tb:px-[6.5rem] mb:px-8 tb:flex mb:grid tb:pb-16 mb:pb-8 grid-cols-2 grid-rows-2 items-center justify-between gap-y-[3.75rem] bg-black pt-8'>
      <div className='row-start-2 text-center text-gray60'>@Codeit-2023</div>
      <div className='col-start-1 flex justify-center gap-7'>
        <Link href='/prviacy'>
          <div className='text-gray20'>Privacy Policy</div>
        </Link>
        <Link href='/faq'>
          <div className='text-gray20'>FAQ</div>
        </Link>
      </div>
      <SocialLink />
    </footer>
  );
};

export default Footer;
