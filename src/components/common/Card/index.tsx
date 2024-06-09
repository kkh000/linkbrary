/* eslint-disable @next/next/no-img-element */

import Image from 'next/image';
import { ICON, IMAGE } from '@/constants/images';
import useToggled from '@/hooks/useToggled';
import Popover from '@/components/common/Popover';
import DeleteLinkModal from '@/components/common/Modal/DeleteModal';
import ListModal from '@/components/common/Modal/ListModal';
import Link from 'next/link';
import { FolderListItem } from '@/types/folderListType';
import { useRouter } from 'next/router';
import CardContent from './CardContent';
import { CardProps } from '@/types/cardType';

import { createLink, deleteLink } from '@/utils/apis/linkApis';

interface CardItemProps extends CardProps {
  folderList?: FolderListItem[];
  renderingCardList: (folderId: string) => void;
}

const Card = ({ id, created_at, description, url, image_source, folderList, renderingCardList }: CardItemProps) => {
  const [isToggled, handleToggled] = useToggled({ popvoer: false, deleteLinkModal: false, listModal: false });

  const route = useRouter();
  const pagePath = route.asPath.split('/')[1];
  const folderId = route.query.id as string;

  const handleDeleteLink = async () => {
    const response = await deleteLink({ cardId: id });
    if (response?.status === 204) {
      handleToggled('deleteLinkModal');
      renderingCardList(folderId);
    }
  };

  const handleCreateLink = async () => {
    const response = await createLink({ url: url, folderId: folderId });
    if (response?.status === 201) {
      handleToggled('listModal');
    }
  };

  const handleErorrIamge = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    (event.target as HTMLImageElement).src = IMAGE.NO_IMAGE;
  };

  const onlyFolderPage = pagePath !== 'share';

  return (
    <div key={id} className='relative'>
      <Link className='flex flex-col w-[21.25rem] h-[20.875rem] shadow-md rounded-2xl' href={url} target='_blank'>
        <img
          className='object-cover rounded-t-2xl w-[21.25rem] h-[17.5rem] overflow-hidden'
          src={image_source}
          onError={handleErorrIamge}
          alt='none'
        />
        <CardContent
          createdAt={created_at}
          description={description}
          handleToggled={() => handleToggled('popover')}
          pagePath={pagePath}
        />
      </Link>
      {onlyFolderPage && (
        <button className='absolute top-[15px] right-[15px]'>
          <Image src={ICON.STAR} alt='star' width={34} height={34} />
        </button>
      )}

      {isToggled.popover && (
        <Popover
          firstTitle='삭제하기'
          secondTitle='폴더에 추가'
          onClickFirstButton={() => handleToggled('deleteLinkModal')}
          onClickSecondButton={() => handleToggled('listModal')}
          closePopover={() => handleToggled('popover')}
          position='top-[230px] right-[-60px]'
        />
      )}
      {isToggled.deleteLinkModal && (
        <DeleteLinkModal
          title='링크 삭제'
          content={url}
          handleModal={() => handleToggled('deleteLinkModal')}
          onClick={handleDeleteLink}>
          삭제하기
        </DeleteLinkModal>
      )}
      {isToggled.listModal && (
        <ListModal
          title='폴더에 추가'
          content={url}
          handleModal={() => handleToggled('listModal')}
          folderList={folderList}
          onClick={handleCreateLink}>
          추가하기
        </ListModal>
      )}
    </div>
  );
};

export default Card;
