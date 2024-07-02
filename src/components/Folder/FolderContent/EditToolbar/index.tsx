import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import DeleteFolderModal from '@/components/common/Modal/DeleteModal';
import ChangeNameModal from '@/components/common/Modal/InputModal';
import { ICON } from '@/constants/images';
import { ERROR_MESSAGE, MESSAGE } from '@/constants/text';
import useToggled from '@/hooks/useToggled';
import { queryClient } from '@/pages/_app';
import { ErrorResponse } from '@/types/commonType';
import { changeFolderName, deleteFolder } from '@/utils/apis/folderApi';

interface EditToolbarProps {
  folderName: string | undefined;
  folderId: string;
}

const EditToolbar = ({ folderName, folderId }: EditToolbarProps) => {
  const [isToggeld, handleToggled] = useToggled({ changeNameModal: false, deleteFolderModal: false });

  const route = useRouter();

  const changeNewName = useMutation({
    mutationFn: ({ newFolderName, folderId }: { newFolderName: string; folderId: string }) =>
      changeFolderName(newFolderName, folderId),
    onSuccess: () => {
      toast.success(MESSAGE.CHNAGE_FOLDER_NAME);
      handleToggled('changeNameModal');
      queryClient.invalidateQueries({ queryKey: ['folderList'] });
      queryClient.invalidateQueries({ queryKey: ['folderName'] });
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage = error?.response?.data?.message || ERROR_MESSAGE.UNKNOWN_ERROR;
      toast.error(errorMessage);
    },
  });

  const deleteFolders = useMutation({
    mutationFn: (folderId: string) => deleteFolder(folderId),
    onSuccess: () => {
      toast.success(MESSAGE.DELETE_FOLDER);
      handleToggled('deletoFolderModal');
      queryClient.invalidateQueries({ queryKey: ['folderList'] });
      route.push('/folder/all');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage = error?.response?.data?.message || ERROR_MESSAGE.UNKNOWN_ERROR;
      toast.error(errorMessage);
    },
  });

  const handleFolderName = async (newFolderName: string, folderId: string) => {
    changeNewName.mutate({ newFolderName, folderId });
  };
  const handleDeleteFolder = async (folderId: string) => {
    deleteFolders.mutate(folderId);
  };

  return (
    <div className='flex gap-3'>
      <div className='flex cursor-pointer gap-1'>
        <Image src={ICON.SHARE} alt='share' width={18} height={18} />
        <div className='text-sm font-semibold text-gray60 hover:text-black'>공유</div>
      </div>
      <div className='flex cursor-pointer gap-1' onClick={() => handleToggled('changeNameModal')}>
        <Image src={ICON.CHANGE} alt='change' width={18} height={18} />
        <div className='text-sm font-semibold text-gray60 hover:text-black'>이름 변경</div>
      </div>
      {isToggeld.changeNameModal && (
        <ChangeNameModal
          title='폴더 이름 변경'
          placeholder={folderName as string}
          handleModal={() => handleToggled('changeNameModal')}
          onClick={(newFolderName: string) => handleFolderName(newFolderName, folderId)}>
          변경하기
        </ChangeNameModal>
      )}
      <div className='flex cursor-pointer gap-1' onClick={() => handleToggled('deleteFolderModal')}>
        <Image src={ICON.DELETE} alt='share' width={18} height={18} />
        <div className='text-sm font-semibold text-gray60 hover:text-black'>삭제</div>
      </div>
      {isToggeld.deleteFolderModal && (
        <DeleteFolderModal
          title='폴더 삭제'
          content={folderName as string}
          handleModal={() => handleToggled('deleteFolderModal')}
          onClick={() => handleDeleteFolder(folderId)}>
          삭제하기
        </DeleteFolderModal>
      )}
    </div>
  );
};

export default EditToolbar;
