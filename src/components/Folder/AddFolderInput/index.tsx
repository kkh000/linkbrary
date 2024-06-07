import Image from 'next/image';
import Button from '@/components/common/Button';
import { ICON } from '@/constants/images';
import { FolderListItem } from '@/types/folderListType';
import useToggled from '@/hooks/useToggled';
import ListModal from '@/components/common/Modal/ListModal';
import useInput from '@/hooks/useInput';

interface AddFolderInputProps {
  folderList: FolderListItem[];
}

const AddFolderInput = ({ folderList }: AddFolderInputProps) => {
  const [isToggled, handleToggled] = useToggled({ listModal: false });
  const newLinkInput = useInput('');

  return (
    <header className='flex justify-center w-full pt-[3.75rem] pb-[5.625rem]'>
      <div className='flex gap-3 w-[50rem] py-4 px-5 bg-white rounded-2xl border-primary border focus-within:border-2'>
        <Image src={ICON.LINK} alt='link' width={20} height={20} />
        <input
          className='flex w-full'
          value={newLinkInput.value}
          onChange={newLinkInput.onChange}
          placeholder='링크를 추가해 보세요'
        />
        <Button type='button' size='w-[8.125rem] py-[.625rem] px-4' onClick={() => handleToggled('listModal')}>
          추가하기
        </Button>
      </div>
      {isToggled.listModal && (
        <ListModal
          title='폴더에 추가'
          content={newLinkInput.value}
          folderList={folderList}
          handleModal={() => handleToggled('listModal')}>
          추가하기
        </ListModal>
      )}
    </header>
  );
};

export default AddFolderInput;
