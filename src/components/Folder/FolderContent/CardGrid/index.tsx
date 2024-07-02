import { useState } from 'react';

import Card from '@/components/common/Card';
import useToggled from '@/hooks/useToggled';
import { CardItemProps } from '@/types/cardType';
import { FolderListItem } from '@/types/folderType';

interface CardGridProps {
  folderList?: FolderListItem[];
  cardList: CardItemProps[];
}

const CardGrid = ({ cardList, folderList }: CardGridProps) => {
  const [isToggled, handleToggled] = useToggled({ isShowAllCards: false });
  const [sortBy, setSortBy] = useState<'latest' | 'favorite' | 'random'>('latest');

  const sortCards = (cards: CardItemProps[]) => {
    switch (sortBy) {
      case 'favorite':
        return cards.sort((a, b) => (a.favorite === b.favorite ? 0 : a.favorite ? -1 : 1));
      case 'random':
        return cards.sort(() => Math.random() - 0.5);
      case 'latest':
      default:
        return cards.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
  };

  const sortedCards = sortCards(cardList);
  const visibleCards = isToggled.isShowAllCards ? sortedCards : sortedCards.slice(0, 9);

  return (
    <div className='flex flex-col'>
      <div className='flex justify-start gap-10 pt-5'>
        <button onClick={() => setSortBy('latest')}>최신순</button>
        <button onClick={() => setSortBy('favorite')}>좋아요</button>
        <button onClick={() => setSortBy('random')}>랜덤</button>
      </div>
      <div className='grid grid-cols-3 gap-x-5 gap-y-6 pt-6'>
        {visibleCards.map((card: CardItemProps) => (
          <Card
            key={card.id}
            id={card.id}
            image_source={card.image_source}
            created_at={card.created_at}
            description={card.title}
            title={card.description}
            favorite={card.favorite}
            url={card.url}
            folderList={folderList}
          />
        ))}
      </div>
      {!isToggled.isShowAllCards && sortedCards.length > 9 && (
        <button
          className='mx-auto mt-10 w-[200px] rounded-lg bg-primary py-5 text-lg font-bold text-white'
          onClick={() => handleToggled('isShowAllCards')}>
          더보기
        </button>
      )}
    </div>
  );
};

export default CardGrid;
