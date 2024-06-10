import FolderProfile from './FolderProfile';

import { useRouter } from 'next/router';

import useRedirect from '@/hooks/useRedirect';
import ShareContent from './ShareContent';

const SharePage = () => {
  useRedirect('/signin', true);

  const route = useRouter();
  const folderId = route.query.id as string;

  return (
    <main className='flex flex-col justify-center items-center w-full '>
      <FolderProfile folderId={folderId} />
      <ShareContent folderId={folderId} />
    </main>
  );
};
export default SharePage;
