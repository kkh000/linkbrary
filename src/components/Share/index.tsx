import FolderProfile from './FolderProfile';
import SearchInput from '../Folder/SearchInput';

import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import EmptyContent from '../common/EmptyContent';
import Card from '../common/Card';
import { MESSAGE } from '@/constants/text';

import { getFolderLinkList } from '@/utils/apis/linkApis';
import useFilterCard from '@/hooks/useFilterCard';
import useRedirect from '@/hooks/useRedirect';

const SharePage = () => {
  const { filteredCardList, setUserCardList, setSearchKeyword, userCardList, searchKeyword } = useFilterCard();

  useRedirect('/signin', true);

  const route = useRouter();
  const folderId = route.query.id as string;

  const fetchFolderLinkList = useCallback(
    async (folderId: string) => {
      const response = await getFolderLinkList({ folderId: folderId });
      setUserCardList(response?.data);
    },
    [setUserCardList]
  );

  useEffect(() => {
    const hasFolderId = folderId !== undefined;

    if (hasFolderId) {
      fetchFolderLinkList(folderId);
    }
  }, [fetchFolderLinkList, folderId]);

  const hasKeyword = searchKeyword ? filteredCardList : userCardList;
  const emptyCardAndKeyword = searchKeyword === '' ? MESSAGE.EMPTY_CARD : MESSAGE.EMPTY_KEYWORD;

  return (
    <main className='flex flex-col justify-center items-center w-full '>
      <FolderProfile folderId={folderId} />
      <section className='flex flex-col justify-center items-center w-full pt-10 pb-[6.25rem] bg-white '>
        <div className='w-[66.25rem]'>
          <SearchInput setSearchKeyword={setSearchKeyword} />
        </div>
        {hasKeyword.length > 0 ? (
          <div className='grid grid-cols-3 pt-6 gap-x-5 gap-y-6'>
            {hasKeyword.map(card => (
              <Card
                key={card.id}
                id={card.id}
                image_source={card.image_source}
                created_at={card.created_at}
                description={card.title}
                url={card.url}
                title={card.description}
                renderingCardList={() => {}}
              />
            ))}
          </div>
        ) : (
          <EmptyContent message={emptyCardAndKeyword} />
        )}
      </section>
    </main>
  );
};
export default SharePage;
