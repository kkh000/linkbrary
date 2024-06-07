// FolderPage.tsx

import AddFolderButton from './AddFolderButton';
import AddFolderInput from './AddFolderInput';
import EditToolbar from './EditToolbar';
import SearchInput from './SearchInput';
import SortFolder from './SortFolder';
import Card from '../common/Card';
import { useCallback, useEffect, useState } from 'react';
import instance from '@/utils/apis/axios';
import { useRouter } from 'next/router';
import EmptyContent from '../common/EmptyContent';
import { MESSAGE } from '@/constants/text';

interface CardProps {
  id: number;
  created_at: string;
  url: string;
  title: string;
  image_source: string;
}

const FolderPage = () => {
  const [userCardList, setUserCardList] = useState<CardProps[]>([]);
  const [userFolderList, setUserFolderList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [folderName, setFolderName] = useState('전체');

  const route = useRouter();
  const queryId = route.query.id?.toString();

  const filteredCardList = userCardList.filter(item => item.title.toLowerCase().includes(searchKeyword.toLowerCase()));

  const getCardList = useCallback(async (folderId: string) => {
    try {
      const endpoint = folderId === 'all' || folderId === 'favorite' ? '/links' : `/folders/${folderId}/links`;
      const response = await instance.get(endpoint);
      const result = response.data;
      setUserCardList(result);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (queryId !== undefined) {
      getCardList(queryId);
    }
    if (queryId === 'all') {
      getCardList('all');
    }
    if (queryId === 'favorite') {
      getCardList('favorite');
    }
  }, [getCardList, queryId]);

  const getFolderList = async () => {
    try {
      const response = await instance.get('/folders');
      const result = response.data;
      setUserFolderList(result);
    } catch (error) {
      console.error('Error fetching folder list:', error);
    }
  };

  useEffect(() => {
    getFolderList();
  }, []);

  const handleFolderSelection = useCallback((folderName: string) => {
    setFolderName(folderName);
  }, []);

  const hasKeyword = searchKeyword ? filteredCardList : userCardList;
  const hasEditToolbar = queryId === 'all' || queryId === 'favorite';

  return (
    <main className='flex flex-col justify-center items-center w-full '>
      <AddFolderInput folderList={userFolderList} />
      <section className='flex flex-col justify-center items-center w-full pt-10 pb-[6.25rem] bg-white '>
        <div className='w-[66.25rem]'>
          <SearchInput setSearchKeyword={setSearchKeyword} />
          <div className='flex justify-between items-center mb-6'>
            <SortFolder
              folderList={userFolderList}
              selectedFolder={handleFolderSelection}
              folderId={queryId?.toString()}
            />
            <AddFolderButton />
          </div>
          <div className='flex justify-between items-center'>
            <h2 className='text-2xl font-bold'>{folderName}</h2>
            {!hasEditToolbar && <EditToolbar folderName={folderName} />}
          </div>
        </div>
        {hasKeyword.length > 0 ? (
          <div className='grid grid-cols-3 pt-6 gap-x-5 gap-y-6'>
            {hasKeyword.map((card: CardProps) => (
              <Card
                key={card.id}
                id={card.id}
                image_source={card.image_source}
                createdAt={card.created_at}
                description={card.title}
                url={card.url}
                folderList={userFolderList}
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
