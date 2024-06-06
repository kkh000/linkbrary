import Link from 'next/link';

interface FolderListProps {
  folderList: FolderListItemProps[];
  selectedFolder: (folderName: string) => void;
  folderId: string | undefined;
}

interface FolderListItemProps {
  id: number;
  created_at: string;
  favorite: boolean;
  name: string;
  link_count: number;
}

const SortFolder = ({ folderList, selectedFolder, folderId }: FolderListProps) => {
  const myFolderList = [{ id: 'all', name: '전체' }, { id: 'favorite', name: '⭐️ 즐겨찾기' }, ...folderList];

  const handleFolderName = (folderName: string) => () => {
    selectedFolder(folderName);
  };

  return (
    <div className='flex gap-2'>
      {myFolderList.map(({ id, name }) => (
        <Link key={id} href={`/folder/${id}`}>
          <button
            className={`py-2 px-3 rounded-md border border-primary ${folderId?.toString() === id.toString() ? 'bg-primary text-white' : ''}  `}
            onClick={handleFolderName(name)}>
            {name}
          </button>
        </Link>
      ))}
    </div>
  );
};

export default SortFolder;
