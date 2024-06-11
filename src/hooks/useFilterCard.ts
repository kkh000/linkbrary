import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getLinks } from '@/utils/apis/linkApis';
import { CardItemProps } from '@/types/cardType';

const useFilterCard = (folderId: string) => {
  const { data: cardList, isLoading } = useQuery({
    queryKey: ['links', folderId],
    queryFn: () => getLinks(folderId),
    enabled: !!folderId,
  });

  const [searchKeyword, setSearchKeyword] = useState('');

  const filteredCardList = cardList?.filter((item: CardItemProps) =>
    item.title.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return { filteredCardList, setSearchKeyword, searchKeyword, isLoading };
};

export default useFilterCard;
