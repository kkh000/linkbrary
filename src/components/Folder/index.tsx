import AddFolderInput from './AddFolderInput';

import useRedirect from '@/hooks/useRedirect';

import { getFolderList } from '@/utils/apis/folderApi';

import { useQuery } from '@tanstack/react-query';
import FolderContent from './FolderContent';

const FolderPage = () => {
  useRedirect('/signin', true);

  const { data: folderList } = useQuery({ queryKey: ['folderList'], queryFn: getFolderList });

  return (
    <main className='flex flex-col justify-center items-center w-full '>
      <AddFolderInput folderList={folderList} />
      <FolderContent folderList={folderList} />
    </main>
  );
};

export default FolderPage;
