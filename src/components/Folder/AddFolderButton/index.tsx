import Image from 'next/image';

import { ICON } from '@/constants/images';
import useToggled from '@/hooks/useToggled';
import AddFolderModal from '@/components/common/Modal/InputModal';
import instance from '@/utils/apis/axios';

interface AddFolderButtonProps {
  renderingFolderList: () => void;
}

const AddFolderButton = ({ renderingFolderList }: AddFolderButtonProps) => {
  const [isToggled, handleToggled] = useToggled({ addFolderModal: false });

  const addFolder = async (newFolder: string) => {
    try {
      const response = await instance.post('/folders', { name: newFolder });
      if (response.status === 201) {
        handleToggled('addFolderModal');
        renderingFolderList();
      }
    } catch (error) {}
  };

  return (
    <button className='flex items-center gap-1' onClick={() => handleToggled('addFolderModal')}>
      <span className=' font-medium text-primary'>폴더추가</span>
      <Image src={ICON.PLUS} alt='plus' width={16} height={160} />
      {isToggled.addFolderModal && (
        <AddFolderModal
          title='폴더 추가'
          placeholder='내용 입력'
          onClick={addFolder}
          handleModal={() => handleToggled('addFolderModal')}>
          추가하기
        </AddFolderModal>
      )}
    </button>
  );
};

export default AddFolderButton;
