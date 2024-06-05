interface PopoverProps {
  firstTitle: string;
  secondTitle: string;
  position: string;
}

const Popover = ({ firstTitle, secondTitle, position }: PopoverProps) => {
  return (
    <div className={`absolute flex flex-col w-[6.25rem] text-sm ${position} z-10`}>
      <button className='py-2 px3 bg-white'>{firstTitle}</button>
      <button className='py-2 px3 text-primary bg-gray10'>{secondTitle}</button>
    </div>
  );
};

export default Popover;
