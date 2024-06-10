import Image from 'next/image';

import { ICON } from '@/constants/images';
import useToggled from '@/hooks/useToggled';
import AddFolderModal from '@/components/common/Modal/InputModal';

import { createFolder } from '@/utils/apis/folderApi';
import { ToastContainer, toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/pages/_app';

const AddFolderButton = () => {
  const [isToggled, handleToggled] = useToggled({ addFolderModal: false });

  const createNewFolder = useMutation({
    mutationFn: (name: string) => createFolder(name),
    onSuccess: () => {
      toast.success('폴더가 생성되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['folderList'] });
      handleToggled('addFolderModal');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || '에러가 발생했습니다.';
      toast.error(errorMessage);
    },
  });

  const handleCreateFolder = async (name: string) => {
    createNewFolder.mutate(name);
  };

  return (
    <div
      className='flex items-center gap-1  py-2 px-2  rounded-md text-primary hover:border-primary hover:border  hover:bg-primary hover:text-white group'
      onClick={() => handleToggled('addFolderModal')}>
      <span className=' font-medium  hover:text-white'>폴더추가</span>
      <div className='relative w-5 h-5'>
        <Image
          src={ICON.PLUS}
          alt='plus'
          objectFit='contain'
          layout='fill'
          className='absolute transition-opacity duration-100 ease-in-out opacity-100 group-hover:opacity-0'
        />
        <Image
          src={ICON.PLUS_WHITE}
          alt='plus white'
          objectFit='contain'
          layout='fill'
          className='absolute transition-opacity duration-100 ease-in-out opacity-0 group-hover:opacity-100'
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
