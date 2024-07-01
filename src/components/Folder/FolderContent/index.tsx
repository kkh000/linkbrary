import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import EmptyContent from '@/components/common/EmptyContent';
import CardSkeleton from '@/components/common/Skeleton/CardSkeleton';
import { MESSAGE } from '@/constants/text';
import useFilterCard from '@/hooks/useFilterCard';
import { FolderListItem } from '@/types/folderType';
import { getFolderInformation } from '@/utils/apis/folderApi';

import AddFolderButton from '../FolderContent/AddFolderButton';
import EditToolbar from '../FolderContent/EditToolbar';
import SearchInput from '../FolderContent/SearchInput';
import SortFolder from '../FolderContent/SortFolder';

import CardGrid from './CardGrid';

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
  const selectEmptyMessage = searchKeyword === '' ? MESSAGE.EMPTY_CARD : MESSAGE.EMPTY_KEYWORD;

  return (
    <section className='flex w-full flex-col items-center justify-center bg-white pb-[6.25rem] pt-10'>
      <div className='w-[66.25rem]'>
        <SearchInput setSearchKeyword={setSearchKeyword} />
        <div className='mb-6 flex items-center justify-between'>
          <SortFolder folderList={folderList} folderId={folderId} />
          <AddFolderButton />
        </div>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-bold'>{folderName}</h2>
          {!hasEditToolbar && <EditToolbar folderName={folderName} folderId={folderId} />}
        </div>
      </div>
      {cardListLoading ? (
        <CardSkeleton />
      ) : filteredCardList?.length > 0 ? (
        <CardGrid cardList={filteredCardList} folderList={folderList} />
      ) : (
        <EmptyContent message={selectEmptyMessage} />
      )}
    </section>
  );
};

export default FolderContent;
