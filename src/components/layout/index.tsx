import { PropsWithChildren } from 'react';

import Footer from '../Footer';
import Navigation from '../Navigation';

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Navigation />
      <main className='flex-grow'>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
