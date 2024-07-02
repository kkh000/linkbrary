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

  const visibleCards = isToggled.isShowAllCards ? cardList : cardList.slice(0, 9);

  return (
    <div className='flex flex-col items-center gap-10'>
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
      {!isToggled.isShowAllCards && cardList.length > 9 && (
        <button
          className='w-[200px] rounded-lg bg-primary py-5 text-lg font-bold text-white'
          onClick={() => handleToggled('isShowAllCards')}>
          더보기
        </button>
      )}
    </div>
  );
};

export default CardGrid;
