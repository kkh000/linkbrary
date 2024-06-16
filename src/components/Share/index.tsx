import { useEffect, useState } from 'react';
import FolderProfile from './FolderProfile';
import { useRouter } from 'next/router';
import useRedirect from '@/hooks/useRedirect';
import ShareContent from './ShareContent';

const SharePage = () => {
  const [folderId, setFolderId] = useState<string | undefined>(undefined);
  const router = useRouter();

  useRedirect('/signin', true);

  useEffect(() => {
    if (router.query.id) {
      setFolderId(router.query.id as string);
    }
  }, [router.query.id]);

  if (!folderId) {
    return <div>Loading...</div>;
  }

  return (
    <main className='flex flex-col justify-center items-center w-full'>
      <FolderProfile folderId={folderId} />
      <ShareContent folderId={folderId} />
    </main>
  );
};

export default SharePage;
