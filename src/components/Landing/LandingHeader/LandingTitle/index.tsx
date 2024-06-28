const textGradient = 'bg-gradient-to-r from-blue-600 to-pink-300 bg-clip-text text-transparent';

const LandingTitle = () => {
  return (
    <h1 className='text-[2rem] font-bold tb:text-[4rem] dark:text-white'>
      <span className={textGradient}>세상의 모든 정보</span>
      를<br /> 쉽게 저장하고 <br className='pc:hidden' />
      관리해 보세요
    </h1>
  );
};

export default LandingTitle;
