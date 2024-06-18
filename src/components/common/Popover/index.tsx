import useClickOutside from '@/hooks/useClickOustide';

interface PopoverProps {
  firstTitle: string;
  secondTitle: string;
  position: string;
  onClickFirstButton: () => void;
  onClickSecondButton: () => void;
  closePopover: () => void;
}

const Popover = ({
  firstTitle,
  secondTitle,
  position,
  onClickFirstButton,
  onClickSecondButton,
  closePopover,
}: PopoverProps) => {
  const popoverRef = useClickOutside(closePopover);

  return (
    <div ref={popoverRef} className={`absolute flex w-[6.25rem] flex-col text-sm ${position} z-10`}>
      <button className='px3 bg-white py-2' onClick={onClickFirstButton}>
        {firstTitle}
      </button>
      <button className='px3 bg-gray10 py-2 text-primary' onClick={onClickSecondButton}>
        {secondTitle}
      </button>
    </div>
  );
};

export default Popover;
