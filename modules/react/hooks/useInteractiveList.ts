import {
  addressToInput,
  IAddress,
  IAddressInput,
} from "@/modules/profile/types";
import { useEffect, useState } from "react";

export const useInteractiveList = <T>(
  initialList?: Partial<T | undefined>[]
) => {
  const [list, setList] = useState(initialList ?? []);

  useEffect(() => {
    setList(initialList ?? []);
  }, [initialList]);

  const handleAddClick = () => {
    setList(p => [...p, undefined]);
  };

  const handleRemoveClick = (i: number) => {
    setList(p => {
      p.splice(i, 1);
      return [...p];
    });
  };

  const handleItemChange = (item: Partial<T>, i: number) => {
    setList(previous => {
      previous[i] = item;
      return [...previous];
    });
  };

  return {
    list,
    handleAddClick,
    handleRemoveClick,
    handleItemChange,
  };
};
