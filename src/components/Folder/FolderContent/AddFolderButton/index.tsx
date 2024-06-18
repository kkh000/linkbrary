import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';

import AddFolderModal from '@/components/common/Modal/InputModal';
import { ICON } from '@/constants/images';
import { ERROR_MESSAGE, MESSAGE } from '@/constants/text';
import useToggled from '@/hooks/useToggled';
import { queryClient } from '@/pages/_app';
import { ErrorResponse } from '@/types/commonType';
import { createFolder } from '@/utils/apis/folderApi';

const AddFolderButton = () => {
  const [isToggled, handleToggled] = useToggled({ addFolderModal: false });

  const createNewFolder = useMutation({
    mutationFn: (name: string) => createFolder(name),
    onSuccess: () => {
      toast.success(MESSAGE.ADD_FOLDER);
      queryClient.invalidateQueries({ queryKey: ['folderList'] });
      handleToggled('addFolderModal');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage = error?.response?.data?.message || ERROR_MESSAGE.UNKNOWN_ERROR;
      toast.error(errorMessage);
    },
  });

  const handleCreateFolder = async (name: string) => {
    createNewFolder.mutate(name);
  };

  return (
    <div
      className='group flex items-center gap-1 rounded-md px-2 py-2 text-primary hover:border hover:border-primary hover:bg-primary hover:text-white'
      onClick={() => handleToggled('addFolderModal')}>
      <span className='font-medium hover:text-white'>폴더추가</span>
      <div className='relative h-5 w-5'>
        <Image
          src={ICON.PLUS}
          alt='plus'
          objectFit='contain'
          layout='fill'
          className='absolute opacity-100 transition-opacity duration-100 ease-in-out group-hover:opacity-0'
        />
        <Image
          src={ICON.PLUS_WHITE}
          alt='plus white'
          objectFit='contain'
          layout='fill'
          className='absolute opacity-0 transition-opacity duration-100 ease-in-out group-hover:opacity-100'
        />
      </div>
      <ToastContainer position='top-center' autoClose={3000} />
      {isToggled.addFolderModal && (
        <AddFolderModal
          title='폴더 추가'
          placeholder='내용 입력'
          onClick={handleCreateFolder}
          handleModal={() => handleToggled('addFolderModal')}>
          추가하기
        </AddFolderModal>
      )}
    </div>
  );
};

export default AddFolderButton;
