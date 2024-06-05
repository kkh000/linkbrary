interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  type: 'submit' | 'button';
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({ children, onClick, type = 'button', disabled }: ButtonProps) => {
  return (
    <button
      className='w-full py-4 px-5 rounded-lg bg-primary text-lg font-semibold text-white hover:opacity-80 disabled:bg-gray60 hover:disabled:opacity-100'
      type={type}
      onClick={onClick}
      disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
