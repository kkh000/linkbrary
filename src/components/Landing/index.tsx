import useRedirect from '@/hooks/useRedirect';

import LandingHeader from './LandingHeader';
import LandingMain from './LandingMain';

const LandingPage = () => {
  useRedirect('/folder/all', false);
  return (
    <>
      <LandingHeader />
      <LandingMain />
    </>
  );
};

export default LandingPage;
