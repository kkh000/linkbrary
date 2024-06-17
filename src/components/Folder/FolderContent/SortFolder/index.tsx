import Link from 'next/link';

import { FolderListItem } from '@/types/folderType';

interface FolderListProps {
  folderList: FolderListItem[] | undefined;
  folderId: string;
}

const SortFolder = ({ folderList, folderId }: FolderListProps) => {
  const myFolderList = [{ id: 'all', name: '전체' }, ...(folderList ?? [])];

  return (
    <div className='flex gap-2'>
      {myFolderList.map(({ id, name }) => (
        <Link key={id} href={`/folder/${id}`}>
          <button
            className={`py-2 px-3 rounded-md border border-primary ${folderId == id && 'bg-primary text-white'}  `}>
            {name}
          </button>
        </Link>
      ))}
    </div>
  );
};

export default SortFolder;
