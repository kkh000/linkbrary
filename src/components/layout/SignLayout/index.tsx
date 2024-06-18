import { PropsWithChildren } from 'react';

const SignLayout = ({ children }: PropsWithChildren) => {
  return <main className='flex flex-col items-center justify-center pt-[8rem]'>{children}</main>;
};

export default SignLayout;
