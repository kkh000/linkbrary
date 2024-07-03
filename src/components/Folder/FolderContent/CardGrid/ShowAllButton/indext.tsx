interface ShowAllButtonProps {
  onClick: () => void;
}

const ShowAllButton = ({ onClick }: ShowAllButtonProps) => {
  return (
    <button
      className='mx-auto mt-10 w-[200px] rounded-lg bg-primary py-5 text-lg font-bold text-white'
      onClick={onClick}>
      더보기
    </button>
  );
};
export default ShowAllButton;
