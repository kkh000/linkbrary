const CardSkeleton = () => (
  <div className='grid grid-cols-3 gap-x-5 gap-y-6 pt-6'>
    {[...Array(6)].map((_, index) => (
      <div key={index} className='flex h-[20.875rem] w-[21.25rem] flex-col rounded-2xl shadow-md'>
        <div className='h-[17.5rem] overflow-hidden rounded-t-2xl bg-gray20'></div>
        <div className='flex flex-col justify-between gap-[.625rem] px-5 py-[.9375rem]'>
          <div className='flex h-[110px] flex-col gap-[15px]'>
            <div className='h-[15px] w-[150px] rounded-xl bg-gray20'></div>
            <div className='h-[15px] w-[250px] rounded-xl bg-gray20'></div>
            <div className='h-[15px] w-[200px] rounded-xl bg-gray20'></div>
            <div className='h-[15px] w-[130px] rounded-xl bg-gray20'></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default CardSkeleton;
