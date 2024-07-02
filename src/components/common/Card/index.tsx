import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import DeleteLinkModal from '@/components/common/Modal/DeleteModal';
import ListModal from '@/components/common/Modal/ListModal';
import Popover from '@/components/common/Popover';
import { ICON, IMAGE } from '@/constants/images';
import { ERROR_MESSAGE, MESSAGE } from '@/constants/text';
import useToggled from '@/hooks/useToggled';
import { queryClient } from '@/pages/_app';
import { CardItemProps } from '@/types/cardType';
import { ErrorResponse } from '@/types/commonType';
import { FolderListItem } from '@/types/folderType';
import { changeLink, createLink, deleteLink } from '@/utils/apis/linkApis';

import CardContent from './CardContent';

interface CardProps extends CardItemProps {
  folderList?: FolderListItem[];
}

const Card = ({ id, created_at, description, url, image_source, folderList, favorite }: CardProps) => {
  const [isToggled, handleToggled] = useToggled({
    popvoer: false,
    deleteLinkModal: false,
    listModal: false,
    favorite: false,
  });

  const router = useRouter();
  const folderId = router.query.id as string | undefined;

  const deleteCardLink = useMutation({
    mutationFn: (id: number) => deleteLink(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] });
      handleToggled('deleteLinkModal');
      toast.success(MESSAGE.DELETE_LINK);
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage = error?.response?.data?.message || ERROR_MESSAGE.UNKNOWN_ERROR;
      toast.error(errorMessage);
    },
  });

  const createCardLink = useMutation({
    mutationFn: ({ url, folderId }: { url: string; folderId: string | number }) => createLink({ url, folderId }),
    onSuccess: () => {
      toast.success(MESSAGE.ADD_LINK);
      queryClient.invalidateQueries({ queryKey: ['links'] });
      handleToggled('listModal');
      if (folderId) router.push(folderId.toString());
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage = error?.response?.data?.message || ERROR_MESSAGE.UNKNOWN_ERROR;
      toast.error(errorMessage);
    },
  });

  const changeCardFavorite = useMutation({
    mutationFn: ({ favorite, cardId }: { favorite: boolean; cardId: string | number }) => {
      const newFavorite = !favorite;
      return changeLink({ favorite: newFavorite, cardId });
    },
    onSuccess: () => {
      if (!favorite) {
        toast.success('즐겨찾기에 등록되었습니다.');
      } else {
        toast.error('즐겨찾기에서 제거되었습니다.');
      }

      queryClient.invalidateQueries({ queryKey: ['links'] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage = error?.response?.data?.message || ERROR_MESSAGE.UNKNOWN_ERROR;
      toast.error(errorMessage);
    },
  });

  const handleChangeFavortie = async () => {
    changeCardFavorite.mutate({ cardId: id, favorite: favorite });
    handleToggled('favorite');
  };

  const handleDeleteLink = async () => {
    deleteCardLink.mutate(id);
  };

  const handleCreateLink = async ({ url, folderId }: { url: string; folderId: string | number }) => {
    createCardLink.mutate({ url, folderId });
  };

  const handleErrorImage = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    (event.target as HTMLImageElement).src = IMAGE.NO_IMAGE;
  };

  const cardImage = image_source === null ? IMAGE.NO_IMAGE : image_source;

  return (
    <div key={id} className='group relative'>
      <Link className='flex h-[20.875rem] w-[21.25rem] flex-col rounded-2xl shadow-md' href={url} target='_blank'>
        <div className='z-1 relative h-[17.5rem] w-[21.25rem] overflow-hidden rounded-t-2xl'>
          <img
            className='h-full w-full transform object-cover transition-transform duration-300 ease-in-out group-hover:scale-130'
            src={cardImage}
            onError={handleErrorImage}
            alt='none'
          />
        </div>
        <CardContent createdAt={created_at} description={description} handleToggled={() => handleToggled('popover')} />
      </Link>

      <button className='absolute right-[15px] top-[15px]' onClick={handleChangeFavortie}>
        <Image src={favorite ? ICON.STAR_BLUE : ICON.STAR} alt='star' width={34} height={34} />
      </button>

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
          onClick={(folderId: number) => handleCreateLink({ url: url, folderId: folderId })}>
          추가하기
        </ListModal>
      )}
    </div>
  );
};

export default Card;
