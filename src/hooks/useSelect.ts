import { useState } from 'react';

const useSelect = () => {
  const [selectItem, setSelectItem] = useState<number | null>(null);

  const handleSelectItem = (itemId: number) => {
    setSelectItem(itemId === selectItem ? null : itemId);
  };

  const isSelected = (itemId: number) => itemId === selectItem;

  return { selectItem, handleSelectItem, isSelected };
};

export default useSelect;
