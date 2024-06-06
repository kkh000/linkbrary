import { ICON } from '@/constants/images';
import useToggled from '@/hooks/useToggled';
import ChangeNameModal from '@/components/common/Modal/InputModal';
import DeleteFolderModal from '@/components/common/Modal/DeleteModal';
import Image from 'next/image';

interface EditToolbarProps {
  folderName: string;
}

const EditToolbar = ({ folderName }: EditToolbarProps) => {
  const [isToggeld, handleToggled] = useToggled({ changeNameModal: false, deleteFolderModal: false });

  return (
    <div className='flex gap-3'>
      <button className='flex gap-1'>
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
          handleModal={() => handleToggled('changeNameModal')}>
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
          handleModal={() => handleToggled('deleteFolderModal')}>
          삭제하기
        </DeleteFolderModal>
      )}
    </div>
  );
};

export default EditToolbar;
