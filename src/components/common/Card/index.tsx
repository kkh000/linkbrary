/* eslint-disable @next/next/no-img-element */

import { IMAGE } from '@/constants/images';
import useToggled from '@/hooks/useToggled';
import Popover from '@/components/common/Popover';
import DeleteLinkModal from '@/components/common/Modal/DeleteModal';
import ListModal from '@/components/common/Modal/ListModal';
import Link from 'next/link';
import { FolderListItem } from '@/types/folderListType';
import { useRouter } from 'next/router';
import CardContent from './CardContent';

interface CardProps {
  id: number;
  createdAt: string;
  url: string;
  description: string;
  image_source: string;
  folderList?: FolderListItem[];
}

const Card = ({ id, createdAt, description, url, image_source, folderList }: CardProps) => {
  const [isToggled, handleToggled] = useToggled({ popvoer: false, deleteLinkModal: false, listModal: false });

  const route = useRouter();
  const pagePath = route.asPath.split('/')[1];

  return (
    <div key={id} className='relative'>
      <Link className='flex flex-col w-[21.25rem] h-[20.875rem] shadow-md rounded-2xl' href={url} target='_blank'>
        <img
          className='object-cover rounded-t-2xl w-[21.25rem] h-[17.5rem] overflow-hidden'
          src={image_source}
          onError={event => {
            (event.target as HTMLImageElement).src = IMAGE.NO_IMAGE;
          }}
          alt='none'
        />
        <CardContent
          createdAt={createdAt}
          description={description}
          handleToggled={() => handleToggled('popover')}
          pagePath={pagePath}
        />
      </Link>

      {isToggled.popover && (
        <Popover
          firstTitle='삭제하기'
          onClickFirstButton={() => handleToggled('deleteLinkModal')}
          onClickSecondButton={() => handleToggled('listModal')}
          closePopover={() => handleToggled('popover')}
          secondTitle='폴더에 추가'
          position='top-[230px] right-[-60px]'
        />
      )}
      {isToggled.deleteLinkModal && (
        <DeleteLinkModal title='링크 삭제' content={url} handleModal={() => handleToggled('deleteLinkModal')}>
          삭제하기
        </DeleteLinkModal>
      )}
      {isToggled.listModal && (
        <ListModal
          title='폴더에 추가'
          content={url}
          handleModal={() => handleToggled('listModal')}
          folderList={folderList}>
          추가하기
        </ListModal>
      )}
    </div>
  );
};

export default Card;
