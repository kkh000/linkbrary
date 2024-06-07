import FolderProfile from './FolderProfile';
import SearchInput from '../Folder/SearchInput';
import instance from '@/utils/apis/axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import EmptyContent from '../common/EmptyContent';
import Card from '../common/Card';
import { MESSAGE } from '@/constants/text';

interface CardProps {
  id: number;
  created_at: string;
  url: string;
  title: string;
  image_source: string;
}

const SharePage = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [userCardList, setUserCardList] = useState<CardProps[]>([]);

  const route = useRouter();
  const folderId = route.query.id;

  const filteredCardList = userCardList.filter(item => item.title.toLowerCase().includes(searchKeyword.toLowerCase()));

  const getShareList = async (folderId: string) => {
    try {
      const response = await instance.get(`/folders/${folderId}/links`);
      const result = response.data;
      setUserCardList(result);
    } catch (error) {}
  };

  useEffect(() => {
    if (folderId !== undefined) {
      getShareList(String(folderId));
    }
  }, [folderId]);

  const hasKeyword = searchKeyword ? filteredCardList : userCardList;

  return (
    <main className='flex flex-col justify-center items-center w-full '>
      <FolderProfile />
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
                createdAt={card.created_at}
                description={card.title}
                url={card.url}
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
export default SharePage;
