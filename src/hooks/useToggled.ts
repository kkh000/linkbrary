import { useState, useCallback } from 'react';

type ToggleStates = Record<string, boolean>;

const useToggled = (initialStates: ToggleStates = {}) => {
  const [isToggled, setIsToggled] = useState<ToggleStates>(initialStates);

  const handleToggled = useCallback((key: keyof ToggleStates) => {
    setIsToggled(prevStates => ({
      ...prevStates,
      [key]: !prevStates[key],
    }));
  }, []);

  return [isToggled, handleToggled] as const;
};

export default useToggled;
