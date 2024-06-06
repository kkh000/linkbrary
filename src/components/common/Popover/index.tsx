interface PopoverProps {
  firstTitle: string;
  secondTitle: string;
  position: string;
  onClickFirstButton: () => void;
  onClickSecondButton: () => void;
}

const Popover = ({ firstTitle, secondTitle, onClickFirstButton, onClickSecondButton, position }: PopoverProps) => {
  return (
    <div className={`absolute flex flex-col w-[6.25rem] text-sm ${position} z-10`}>
      <button className='py-2 px3 bg-white' onClick={onClickFirstButton}>
        {firstTitle}
      </button>
      <button className='py-2 px3 text-primary bg-gray10' onClick={onClickSecondButton}>
        {secondTitle}
      </button>
    </div>
  );
};

export default Popover;
