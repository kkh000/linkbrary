import { PropsWithChildren } from 'react';

const SignLayout = ({ children }: PropsWithChildren) => {
  return <main className='flex flex-col justify-center items-center pt-[8rem] '>{children}</main>;
};

export default SignLayout;
