import AddFolderButton from './AddFolderButton';
import AddFolderInput from './AddFolderInput';
import EditToolbar from './EditToolbar';
import SearchInput from './SearchInput';
import SortFolder from './SortFolder';
import Card from './Card';

const FolderPage = () => {
  return (
    <main className='flex flex-col justify-center items-center w-full'>
      <AddFolderInput />
      <section className='flex flex-col justify-center items-center w-full pt-10 pb-[6.25rem] bg-white'>
        <div className='w-[66.25rem]'>
          <SearchInput />
          <div className='flex justify-between items-center mb-6'>
            <SortFolder />
            <AddFolderButton />
          </div>
          <div className='flex justify-between items-center'>
            <h2 className='text-2xl font-bold'>전체</h2>
            <EditToolbar />
          </div>
        </div>
        <div className='grid grid-cols-3 pt-6 gap-x-5 gap-y-6'>
          <Card />
        </div>
      </section>
    </main>
  );
};

export default FolderPage;
