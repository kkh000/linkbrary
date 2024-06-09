import { useEffect, useState, useCallback } from 'react';

import AddFolderButton from './AddFolderButton';
import AddFolderInput from './AddFolderInput';
import EditToolbar from './EditToolbar';
import SearchInput from './SearchInput';
import SortFolder from './SortFolder';
import Card from '../common/Card';

import { useRouter } from 'next/router';
import EmptyContent from '../common/EmptyContent';
import { MESSAGE } from '@/constants/text';
import useRedirect from '@/hooks/useRedirect';
import { CardProps } from '@/types/cardType';
import { getFolderInformation, getFolderList } from '@/utils/apis/folderApi';
import { getFolderLinkList } from '@/utils/apis/linkApis';
import useFilterCard from '@/hooks/useFilterCard';

const FolderPage = () => {
  const [userFolderList, setUserFolderList] = useState([]);

  const [folderName, setFolderName] = useState('전체');

  const { filteredCardList, setUserCardList, setSearchKeyword, userCardList, searchKeyword } = useFilterCard();

  useRedirect('/signin', true);

  const route = useRouter();
  const folderId = route.query.id as string;

  const fetchFolderList = async () => {
    const response = await getFolderList();
    setUserFolderList(response?.data);
  };

  useEffect(() => {
    fetchFolderList();
  }, []);

  const fetchFolderName = async (folderId: string) => {
    const defaultFolder = folderId === 'all';
    if (defaultFolder) {
      setFolderName('전체');
    }
    if (!defaultFolder) {
      const response = await getFolderInformation({ folderId: folderId });
      const folderName = response?.data[0].name;
      setFolderName(folderName);
    }
  };

  useEffect(() => {
    const hasFolderId = folderId !== undefined;
    if (hasFolderId) {
      fetchFolderName(folderId);
    }
  }, [folderId]);

  const fetchFolderLinkList = useCallback(
    async (folderId: string) => {
      const response = await getFolderLinkList({ folderId: folderId });
      setUserCardList(response?.data);
    },
    [setUserCardList]
  );

  useEffect(() => {
    const hasFolderId = folderId !== undefined;
    const hasAllCard = folderId === 'all';

    if (hasFolderId) {
      fetchFolderLinkList(folderId);
    }
    if (hasAllCard) {
      fetchFolderLinkList('all');
    }
  }, [fetchFolderLinkList, folderId]);

  const hasKeyword = searchKeyword ? filteredCardList : userCardList;
  const hasEditToolbar = folderId === 'all';

  return (
    <main className='flex flex-col justify-center items-center w-full '>
      <AddFolderInput folderList={userFolderList} renderingCardList={fetchFolderLinkList} />
      <section className='flex flex-col justify-center items-center w-full pt-10 pb-[6.25rem] bg-white '>
        <div className='w-[66.25rem]'>
          <SearchInput setSearchKeyword={setSearchKeyword} />
          <div className='flex justify-between items-center mb-6'>
            <SortFolder folderList={userFolderList} folderId={folderId} />
            <AddFolderButton renderingFolderList={getFolderList} />
          </div>
          <div className='flex justify-between items-center'>
            <h2 className='text-2xl font-bold'>{folderName}</h2>
            {!hasEditToolbar && <EditToolbar folderName={folderName} renderingFolderList={getFolderList} />}
          </div>
        </div>
        {hasKeyword.length > 0 ? (
          <div className='grid grid-cols-3 pt-6 gap-x-5 gap-y-6'>
            {hasKeyword.map((card: CardProps) => (
              <Card
                key={card.id}
                id={card.id}
                image_source={card.image_source}
                created_at={card.created_at}
                description={card.title}
                title={card.description}
                favorite={card.favorite}
                url={card.url}
                folderList={userFolderList}
                renderingCardList={fetchFolderLinkList}
              />
            ))}
          </div>
        ) : (
          <EmptyContent message={searchKeyword === '' ? MESSAGE.EMPTY_CARD : MESSAGE.EMPTY_KEYWORD} />
        )}
      </section>
    </main>
  );
};

export default FolderPage;
