interface EmptyContentProps {
  message: string;
}

const EmptyContent = ({ message }: EmptyContentProps) => {
  return <div className=' py-[5rem] text-2xl font-bold '>{message}</div>;
};

export default EmptyContent;
