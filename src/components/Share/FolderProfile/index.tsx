import { useQuery } from '@tanstack/react-query';

import { getFolderInformation, getUserData } from '@/utils/apis/folderApi';

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
    <header className='flex flex-col items-center justify-center pb-[3.75rem] pt-5'>
      <img src={userData[0].image_source} alt='image' width={60} height={60} />
      <div className='pb-5 pt-3'>{userData[0].email}</div>
      <div className='text-4xl font-semibold'>{folderName}</div>
    </header>
  );
};

export default FolderProfile;
