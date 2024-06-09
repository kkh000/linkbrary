import Image from 'next/image';
import Button from '@/components/common/Button';
import { ICON } from '@/constants/images';
import { FolderListItem } from '@/types/folderListType';
import useToggled from '@/hooks/useToggled';
import ListModal from '@/components/common/Modal/ListModal';
import useInput from '@/hooks/useInput';
import { createLink } from '@/utils/apis/linkApis';
import { toast } from 'react-toastify';

interface AddFolderInputProps {
  folderList: FolderListItem[];
  renderingCardList: (folderId: string) => void;
}

const AddFolderInput = ({ folderList, renderingCardList }: AddFolderInputProps) => {
  const [isToggled, handleToggled] = useToggled({ listModal: false });
  const { value, onChange } = useInput('');

  const handleCreateLink = async ({ url, folderId }: { url: string; folderId: number }) => {
    const response = await createLink({ url: url, folderId: folderId });
    if (response?.status === 201) {
      handleToggled('listModal');
      renderingCardList(String(folderId));
      toast.success('링크가 추가되었습니다.');
    }
    if (response && 'message' in response) {
      toast.error(response?.message);
    }
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
