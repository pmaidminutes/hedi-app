import { useEffect, useState } from "react";

export const useInteractiveList = <T>(
  initialList?: Partial<T>[],
  onChange?: (data: Partial<T>[]) => void
) => {
  const [list, setList] = useState(initialList ?? []);

  useEffect(() => {
    setList(initialList ?? []);
  }, [initialList]);

  const handleAddClick = () => {
    setList(prev => [...prev, {}]);
  };

  const handleRemoveClick = (i: number) => {
    setList(prev => {
      prev.splice(i, 1);
      const newState = [...prev];
      if (onChange) onChange(newState);
      return newState;
    });
  };

  const handleItemChange = (item: Partial<T>, i: number) => {
    setList(prev => {
      prev[i] = item;
      const newState = [...prev];
      if (onChange) onChange(newState);
      return newState;
    });
  };

  return {
    list,
    handleAddClick,
    handleRemoveClick,
    handleItemChange,
  };
};
