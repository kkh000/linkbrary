import { useQuery } from '@tanstack/react-query';

import { getFolderList } from '@/utils/apis/folderApi';

import CreateCradInput from './CreateCardInput';
import FolderContent from './FolderContent';

const FolderPage = () => {
  const { data: folderList } = useQuery({ queryKey: ['folderList'], queryFn: getFolderList });

  return (
    <main className='flex w-full flex-col items-center justify-center'>
      <CreateCradInput folderList={folderList} />
      <FolderContent folderList={folderList} />
    </main>
  );
};

export default FolderPage;
