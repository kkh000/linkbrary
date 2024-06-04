interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  type: 'submit' | 'button';
  onClick?: () => void;
}

const Button = ({ children, onClick, type = 'button' }: ButtonProps) => {
  return (
    <button
      className='w-full py-4 px-5 rounded-lg bg-primary text-lg font-semibold text-white hover:opacity-80'
      type={type}
      onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
