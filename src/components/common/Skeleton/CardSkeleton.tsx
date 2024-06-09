const CardSkeleton = () => (
  <div className='grid grid-cols-3 pt-6 gap-x-5 gap-y-6'>
    {[...Array(6)].map((_, index) => (
      <div key={index} className='flex flex-col w-[21.25rem] h-[20.875rem] shadow-md rounded-2xl '>
        <div className='rounded-t-2xl  h-[17.5rem] bg-gray20 overflow-hidden'></div>
        <div className='flex flex-col justify-between gap-[.625rem] px-5 py-[.9375rem]'>
          <div className='flex flex-col gap-[15px] h-[110px]'>
            <div className='bg-gray20 rounded-xl w-[150px] h-[15px]'></div>
            <div className='bg-gray20 rounded-xl w-[250px] h-[15px]'></div>
            <div className='bg-gray20 rounded-xl w-[200px] h-[15px]'></div>
            <div className='bg-gray20 rounded-xl w-[130px] h-[15px]'></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default CardSkeleton;
