import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Image from 'next/image';
import { toast } from 'react-toastify';

import Button from '@/components/common/Button';
import ListModal from '@/components/common/Modal/ListModal';
import Spinner from '@/components/common/Spinner/indext';
import { ICON } from '@/constants/images';
import { ERROR_MESSAGE, MESSAGE, PLACEHOLDER } from '@/constants/text';
import useInput from '@/hooks/useInput';
import useToggled from '@/hooks/useToggled';
import { queryClient } from '@/pages/_app';
import { ErrorResponse } from '@/types/commonType';
import { FolderListItem } from '@/types/folderType';
import { createLink } from '@/utils/apis/linkApis';

interface CreatCardInputProps {
  folderList: FolderListItem[] | undefined;
}

const CreatCardInput = ({ folderList }: CreatCardInputProps) => {
  const [isToggled, handleToggled] = useToggled({ listModal: false });
  const { value, onChange, reset } = useInput('');

  const createCardLink = useMutation({
    mutationFn: ({ url, folderId }: { url: string; folderId: string | number }) => createLink({ url, folderId }),
    onSuccess: () => {
      toast.success(MESSAGE.ADD_LINK);
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['links'] });
      }, 1000);
      reset();

      handleToggled('listModal');
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      const errorMessage = error?.response?.data?.message || ERROR_MESSAGE.UNKNOWN_ERROR;
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
    <header className='flex w-full justify-center pb-[5.625rem] pt-[3.75rem]'>
      <div className='flex w-[50rem] gap-3 rounded-2xl border border-primary bg-white px-5 py-4 focus-within:border-2'>
        <Image src={ICON.LINK} alt='link' width={20} height={20} />
        <input className='flex w-full' value={value} onChange={onChange} placeholder={PLACEHOLDER.ADD_LINK} />
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

export default CreatCardInput;
