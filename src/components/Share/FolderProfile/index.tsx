/* eslint-disable @next/next/no-img-element */
import { useUserStore } from '@/store/userStore';
import { getFolderInformation } from '@/utils/apis/folderApi';

import { useEffect, useState } from 'react';

interface FodlerProfileProps {
  folderId: string;
}

const FolderProfile = ({ folderId }: FodlerProfileProps) => {
  const [folderInformation, setFolderInformation] = useState({ name: '', user_id: 0 });

  const userProfile = useUserStore(state => state.userProfile);

  const fetchFolderInforamtion = async (folderId: string) => {
    const response = await getFolderInformation({ folderId: folderId });
    const folderInformation = response?.data[0];
    setFolderInformation(folderInformation);
  };

  useEffect(() => {
    const hasFolderId = folderId !== undefined;
    if (hasFolderId) {
      fetchFolderInforamtion(folderId);
    }
  }, [folderId]);

  return (
    <header className='flex flex-col justify-center items-center pt-5 pb-[3.75rem]'>
      <img src={userProfile?.image_source} alt='image' width={60} height={60} />
      <div className='pt-3 pb-5'>{userProfile?.email}</div>
      <div className='text-4xl font-semibold'>{folderInformation.name}</div>
    </header>
  );
};

export default FolderProfile;
