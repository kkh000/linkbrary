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
  return (
    <section className='flex flex-col justify-center items-center w-full pt-10 pb-[6.25rem] bg-white '>
      <div className='w-[66.25rem]'>
        <SearchInput setSearchKeyword={setSearchKeyword} />
      </div>
      {filteredCardList?.length > 0 ? (
        <CardGrid cardList={filteredCardList} />
      ) : (
        <EmptyContent message={searchKeyword === '' ? MESSAGE.EMPTY_CARD : MESSAGE.EMPTY_KEYWORD} />
      )}
    </section>
  );
};

export default ShareContent;
