import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import useRedirect from '@/hooks/useRedirect';

import FolderProfile from './FolderProfile';
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
    <main className='flex w-full flex-col items-center justify-center'>
      <FolderProfile folderId={folderId} />
      <ShareContent folderId={folderId} />
    </main>
  );
};

export default SharePage;
