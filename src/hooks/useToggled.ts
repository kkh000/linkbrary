import { useState } from 'react';

interface ToggleStates {
  [key: string]: boolean;
}

const useToggled = (initialStates: ToggleStates) => {
  const [toggleStates, setToggleStates] = useState<ToggleStates>(initialStates);

  const handelToggeld = (key: string) => {
    setToggleStates(prevState => ({ ...prevState, [key]: !prevState[key] }));
  };

  return [toggleStates, handelToggeld] as const;
};

export default useToggled;
