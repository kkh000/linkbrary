import Image from 'next/image';
import Link from 'next/link';

import { LOGO } from '@/constants/images';

const SocialLink = () => {
  return (
    <div className='col-start-2 flex justify-center gap-3'>
      {SOCIAL_ICON_LIST &&
        SOCIAL_ICON_LIST.map((icon, index) => (
          <Link href={icon.url} key={index}>
            <Image src={icon.image} alt='logo' width={20} height={20} />
          </Link>
        ))}
    </div>
  );
};

export default SocialLink;

const SOCIAL_ICON_LIST = [
  {
    url: 'https://www.facebook.com',
    image: LOGO.FACEBOOK_LOGO,
  },
  {
    url: 'https://www.twitter.com',
    image: LOGO.TWITTER_LOGO,
  },
  {
    url: 'https://www.youtube.com',
    image: LOGO.YOUTUBE_LOGO,
  },
  {
    url: 'https://www.instagram.com',
    image: LOGO.INSTAGRAM_LOGO,
  },
];
