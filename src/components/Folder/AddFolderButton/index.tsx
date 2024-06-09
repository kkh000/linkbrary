import Image from 'next/image';

import { ICON } from '@/constants/images';
import useToggled from '@/hooks/useToggled';
import AddFolderModal from '@/components/common/Modal/InputModal';

import { createFolder } from '@/utils/apis/folderApi';

interface AddFolderButtonProps {
  renderingFolderList: () => void;
}

const AddFolderButton = ({ renderingFolderList }: AddFolderButtonProps) => {
  const [isToggled, handleToggled] = useToggled({ addFolderModal: false });

  const handleCreateFolder = async (name: string) => {
    const response = await createFolder({ name });
    if (response?.status === 201) {
      handleToggled('addFolderModal');
      renderingFolderList();
    }
  };

  return (
    <button className='flex items-center gap-1' onClick={() => handleToggled('addFolderModal')}>
      <span className=' font-medium text-primary'>폴더추가</span>
      <Image src={ICON.PLUS} alt='plus' width={16} height={160} />
      {isToggled.addFolderModal && (
        <AddFolderModal
          title='폴더 추가'
          placeholder='내용 입력'
          onClick={handleCreateFolder}
          handleModal={() => handleToggled('addFolderModal')}>
          추가하기
        </AddFolderModal>
      )}
    </button>
  );
};

export default AddFolderButton;
