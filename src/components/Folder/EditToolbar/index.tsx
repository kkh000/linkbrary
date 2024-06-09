import { ICON } from '@/constants/images';
import useToggled from '@/hooks/useToggled';
import ChangeNameModal from '@/components/common/Modal/InputModal';
import DeleteFolderModal from '@/components/common/Modal/DeleteModal';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { changeFolderName, deleteFolder } from '@/utils/apis/folderApi';

interface EditToolbarProps {
  folderName: string;
  renderingFolderList: () => void;
}

const EditToolbar = ({ folderName, renderingFolderList }: EditToolbarProps) => {
  const [isToggeld, handleToggled] = useToggled({ changeNameModal: false, deleteFolderModal: false });

  const route = useRouter();
  const folderId = route.query.id as string;

  const handleFolderName = async ({ newFolderName }: { newFolderName: string }) => {
    const response = await changeFolderName({ folderId: folderId, newFolderName: newFolderName });
    if (response?.status === 201) {
      handleToggled('changeNameModal');
      renderingFolderList();
    }
  };

  const handleDeleteFolder = async () => {
    const response = await deleteFolder({ folderId: folderId });
    if (response?.status === 204) {
      handleToggled('deleteFolderModal');
      renderingFolderList();
    }
  };

  return (
    <div className='flex gap-3'>
      <button className='flex gap-1' onClick={() => route.push(`/share/${folderId}`)}>
        <Image src={ICON.SHARE} alt='share' width={18} height={18} />
        <div className='text-sm text-gray60 font-semibold'>공유</div>
      </button>
      <button className='flex gap-1' onClick={() => handleToggled('changeNameModal')}>
        <Image src={ICON.CHANGE} alt='change' width={18} height={18} />
        <div className='text-sm text-gray60 font-semibold'>이름 변경</div>
      </button>
      {isToggeld.changeNameModal && (
        <ChangeNameModal
          title='폴더 이름 변경'
          placeholder={folderName}
          handleModal={() => handleToggled('changeNameModal')}
          onClick={(newFolderName: string) => handleFolderName({ newFolderName })}>
          변경하기
        </ChangeNameModal>
      )}
      <button className='flex gap-1' onClick={() => handleToggled('deleteFolderModal')}>
        <Image src={ICON.DELETE} alt='share' width={18} height={18} />
        <div className='text-sm text-gray60 font-semibold'>삭제</div>
      </button>
      {isToggeld.deleteFolderModal && (
        <DeleteFolderModal
          title='폴더 삭제'
          content={folderName}
          handleModal={() => handleToggled('deleteFolderModal')}
          onClick={handleDeleteFolder}>
          삭제하기
        </DeleteFolderModal>
      )}
    </div>
  );
};

export default EditToolbar;
