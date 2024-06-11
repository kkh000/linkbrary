import EditToolbar from '../FolderContent/EditToolbar';
import SearchInput from '../FolderContent/SearchInput';
import SortFolder from '../FolderContent/SortFolder';

import EmptyContent from '@/components/common/EmptyContent';
import { MESSAGE } from '@/constants/text';

import { useRouter } from 'next/router';

import AddFolderButton from '../FolderContent/AddFolderButton';

import { FolderListItem } from '@/types/folderType';
import { getFolderInformation } from '@/utils/apis/folderApi';
import { useQuery } from '@tanstack/react-query';
import CardGrid from './CardGrid';
import useFilterCard from '@/hooks/useFilterCard';
import CardSkeleton from '@/components/common/Skeleton/CardSkeleton';

interface FolderCotentProps {
  folderList: FolderListItem[] | undefined;
}

const FolderContent = ({ folderList }: FolderCotentProps) => {
  const route = useRouter();
  const folderId = route.query.id as string;

  const { filteredCardList, setSearchKeyword, searchKeyword, isLoading: cardListLoading } = useFilterCard(folderId);

  const { data: folderInformation } = useQuery({
    queryKey: ['folderName', folderId],
    queryFn: () => getFolderInformation(folderId),
    enabled: !!folderId && folderId !== 'all',
  });

  const folderName = folderId === 'all' ? '전체' : folderInformation?.[0]?.name || '';
  const hasEditToolbar = folderId === 'all';

  return (
    <section className='flex flex-col justify-center items-center w-full pt-10 pb-[6.25rem] bg-white '>
      <div className='w-[66.25rem]'>
        <SearchInput setSearchKeyword={setSearchKeyword} />
        <div className='flex justify-between items-center mb-6'>
          <SortFolder folderList={folderList} folderId={folderId} />
          <AddFolderButton />
        </div>
        <div className='flex justify-between items-center'>
          <h2 className='text-2xl font-bold'>{folderName}</h2>
          {!hasEditToolbar && <EditToolbar folderName={folderName} folderId={folderId} />}
        </div>
      </div>
      {cardListLoading ? (
        <CardSkeleton />
      ) : filteredCardList?.length > 0 ? (
        <CardGrid cardList={filteredCardList} folderList={folderList} />
      ) : (
        <EmptyContent message={searchKeyword === '' ? MESSAGE.EMPTY_CARD : MESSAGE.EMPTY_KEYWORD} />
      )}
    </section>
  );
};

export default FolderContent;
