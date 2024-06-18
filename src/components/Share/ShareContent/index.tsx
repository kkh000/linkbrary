import CardGrid from '@/components/Folder/FolderContent/CardGrid';
import SearchInput from '@/components/Folder/FolderContent/SearchInput';
import EmptyContent from '@/components/common/EmptyContent';
import { MESSAGE } from '@/constants/text';
import useFilterCard from '@/hooks/useFilterCard';

interface ShareContentProps {
  folderId: string;
}

const ShareContent = ({ folderId }: ShareContentProps) => {
  const { filteredCardList, setSearchKeyword, searchKeyword } = useFilterCard(folderId);
  const selectEmptyMessage = searchKeyword === '' ? MESSAGE.EMPTY_CARD : MESSAGE.EMPTY_KEYWORD;

  return (
    <section className='flex w-full flex-col items-center justify-center bg-white pb-[6.25rem] pt-10'>
      <div className='w-[66.25rem]'>
        <SearchInput setSearchKeyword={setSearchKeyword} />
      </div>
      {filteredCardList?.length > 0 ? (
        <CardGrid cardList={filteredCardList} />
      ) : (
        <EmptyContent message={selectEmptyMessage} />
      )}
    </section>
  );
};

export default ShareContent;
