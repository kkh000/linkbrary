/* eslint-disable @next/next/no-img-element */

import { getFolderInformation, getUserData } from '@/utils/apis/folderApi';
import { useQuery } from '@tanstack/react-query';

interface FodlerProfileProps {
  folderId: string;
}

const FolderProfile = ({ folderId }: FodlerProfileProps) => {
  const { data: folderInformation } = useQuery({
    queryKey: ['folderName', folderId],
    queryFn: () => getFolderInformation(folderId),
    enabled: !!folderId && folderId !== 'all',
  });

  const { data: userData } = useQuery({ queryKey: ['user'], queryFn: getUserData });

  const folderName = folderId === 'all' ? '전체' : folderInformation?.[0]?.name || '';

  return (
    <header className='flex flex-col justify-center items-center pt-5 pb-[3.75rem]'>
      <img src={userData[0].image_source} alt='image' width={60} height={60} />
      <div className='pt-3 pb-5'>{userData[0].email}</div>
      <div className='text-4xl font-semibold'>{folderName}</div>
    </header>
  );
};

export default FolderProfile;
