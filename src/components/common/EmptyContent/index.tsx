interface EmptyContentProps {
  message: string;
}

const EmptyContent = ({ message }: EmptyContentProps) => {
  return <p className=' py-[7rem] text-2xl font-bold '>{message}</p>;
};

export default EmptyContent;
