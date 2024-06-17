import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { CardItemProps } from '@/types/cardType';
import { getLinks } from '@/utils/apis/linkApis';

import useDebounce from './useDebounce';

const useFilterCard = (folderId: string) => {
  const { data: cardList, isLoading } = useQuery({
    queryKey: ['links', folderId],
    queryFn: () => getLinks(folderId),
    enabled: !!folderId,
  });

  const [searchKeyword, setSearchKeyword] = useState('');

  const debounceKeyowrd = useDebounce(searchKeyword);

  const filteredCardList = cardList?.filter((item: CardItemProps) =>
    item.title.toLowerCase().includes(debounceKeyowrd.toLowerCase())
  );

  return { filteredCardList, setSearchKeyword, searchKeyword, isLoading };
};

export default useFilterCard;
