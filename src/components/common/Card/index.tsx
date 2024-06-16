import Image from 'next/image';
import { ICON, IMAGE } from '@/constants/images';
import useToggled from '@/hooks/useToggled';
import Popover from '@/components/common/Popover';
import DeleteLinkModal from '@/components/common/Modal/DeleteModal';
import ListModal from '@/components/common/Modal/ListModal';
import Link from 'next/link';
import { FolderListItem } from '@/types/folderType';
import { useRouter } from 'next/router';
import CardContent from './CardContent';
import { CardItemProps } from '@/types/cardType';

import { createLink, deleteLink } from '@/utils/apis/linkApis';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/pages/_app';
import { toast } from 'react-toastify';

interface CardProps extends CardItemProps {
  folderList?: FolderListItem[];
}

const Card = ({ id, created_at, description, url, image_source, folderList }: CardProps) => {
  const [isToggled, handleToggled] = useToggled({
    popvoer: false,
    deleteLinkModal: false,
    listModal: false,
  });

  const router = useRouter();
  const pagePath = router.asPath.split('/')[1];
  const folderId = router.query.id as string | undefined;

  const deleteCardLink = useMutation({
    mutationFn: (id: number) => deleteLink(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] });
      handleToggled('deleteLinkModal');
      toast.success('링크가 삭제 되었습니다.');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || '에러가 발생했습니다.';
      toast.error(errorMessage);
    },
  });

  const createCardLink = useMutation({
    mutationFn: ({ url, folderId }: { url: string; folderId: string | number }) => createLink({ url, folderId }),
    onSuccess: () => {
      toast.success('링크가 추가되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['links'] });
      handleToggled('listModal');
      if (folderId) router.push(folderId.toString());
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || '에러가 발생했습니다.';
      toast.error(errorMessage);
    },
  });

  const handleDeleteLink = async () => {
    deleteCardLink.mutate(id);
  };

  const handleCreateLink = async ({ url, folderId }: { url: string; folderId: string | number }) => {
    createCardLink.mutate({ url, folderId });
  };

  const handleErrorImage = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    (event.target as HTMLImageElement).src = IMAGE.NO_IMAGE;
  };

  const onlyFolderPage = pagePath !== 'share';
  const cardImage = image_source || IMAGE.NO_IMAGE;

  return (
    <div key={id} className='relative group'>
      <Link className='flex flex-col w-[21.25rem] h-[20.875rem] shadow-md rounded-2xl' href={url} target='_blank'>
        <div className='relative overflow-hidden rounded-t-2xl w-[21.25rem] h-[17.5rem] z-1'>
          <Image
            className='object-cover w-full h-full transition-transform duration-300 ease-in-out transform group-hover:scale-130'
            src={cardImage}
            onError={handleErrorImage}
            alt='none'
            layout='fill'
          />
        </div>
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
          onClick={(folderId: number) => handleCreateLink({ url: url, folderId: folderId })}>
          추가하기
        </ListModal>
      )}
    </div>
  );
};

export default Card;
