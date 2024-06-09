interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  type?: 'submit' | 'button';
  onClick?: () => void;
  disabled?: boolean;
  color?: string;
  size?: string;
}

const baseStyle =
  'text-lg font-semibold text-white rounded-lg hover:opacity-80 disabled:bg-gray60 hover:disabled:opacity-100';

const Button = ({
  children,
  onClick,
  type = 'button',
  disabled,
  color = 'bg-primary',
  size = 'w-full py-4 px-5',
}: ButtonProps) => {
  return (
    <button className={`${baseStyle} ${size} ${color}`} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
