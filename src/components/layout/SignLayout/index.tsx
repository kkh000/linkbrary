import { PropsWithChildren } from 'react';

const SignLayout = ({ children }: PropsWithChildren) => {
  return <main className='flex flex-col justify-center items-center pt-[14.875rem]'>{children}</main>;
};

export default SignLayout;
