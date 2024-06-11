import Image from 'next/image';
import Button from '@/components/common/Button';
import { ICON } from '@/constants/images';
import { FolderListItem } from '@/types/folderType';
import useToggled from '@/hooks/useToggled';
import ListModal from '@/components/common/Modal/ListModal';
import useInput from '@/hooks/useInput';
import { createLink } from '@/utils/apis/linkApis';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '@/pages/_app';
import Spinner from '@/components/common/Spinner/indext';

interface AddFolderInputProps {
  folderList: FolderListItem[] | undefined;
}

const AddFolderInput = ({ folderList }: AddFolderInputProps) => {
  const [isToggled, handleToggled] = useToggled({ listModal: false });
  const { value, onChange } = useInput('');

  const createCardLink = useMutation({
    mutationFn: ({ url, folderId }: { url: string; folderId: string | number }) => createLink({ url, folderId }),
    onSuccess: () => {
      toast.success('링크가 추가되었습니다.');
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['links'] });
      }, 1000);

      handleToggled('listModal');
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || '에러가 발생했습니다.';
      toast.error(errorMessage);
    },
  });

  if (createCardLink.isPending) {
    return <Spinner />;
  }

  const handleCreateLink = async ({ url, folderId }: { url: string; folderId: string | number }) => {
    createCardLink.mutate({ url, folderId });
  };

  return (
    <header className='flex justify-center w-full pt-[3.75rem] pb-[5.625rem]'>
      <div className='flex gap-3 w-[50rem] py-4 px-5 bg-white rounded-2xl border-primary border focus-within:border-2'>
        <Image src={ICON.LINK} alt='link' width={20} height={20} />
        <input className='flex w-full' value={value} onChange={onChange} placeholder='링크를 추가해 보세요' />
        <Button type='button' size='w-[8.125rem] py-[.625rem] px-4' onClick={() => handleToggled('listModal')}>
          추가하기
        </Button>
      </div>
      {isToggled.listModal && (
        <ListModal
          title='폴더에 추가'
          content={value}
          folderList={folderList}
          handleModal={() => handleToggled('listModal')}
          onClick={(folderId: number) => handleCreateLink({ url: value, folderId: folderId })}>
          추가하기
        </ListModal>
      )}
    </header>
  );
};

export default AddFolderInput;
