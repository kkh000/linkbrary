import { useState } from 'react';
import { CardProps } from '@/types/cardType';

const useFilterCard = () => {
  const [userCardList, setUserCardList] = useState<CardProps[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  const filteredCardList = userCardList.filter(item => item.title.toLowerCase().includes(searchKeyword.toLowerCase()));

  return { filteredCardList, setUserCardList, setSearchKeyword, userCardList, searchKeyword };
};

export default useFilterCard;
