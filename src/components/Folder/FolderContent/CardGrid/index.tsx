import Card from '@/components/common/Card';
import { CardItemProps } from '@/types/cardType';
import { FolderListItem } from '@/types/folderType';

interface CardGridProps {
  folderList?: FolderListItem[] | undefined;
  cardList: CardItemProps[];
}

const CardGrid = ({ cardList, folderList }: CardGridProps) => {
  return (
    <div className='grid grid-cols-3 gap-x-5 gap-y-6 pt-6'>
      {cardList?.map((card: CardItemProps) => (
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
  );
};

export default CardGrid;
