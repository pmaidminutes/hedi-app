import { useState, useEffect } from "react";
import { IItems } from "./transformFuzzyFilterDropdown";

export function useFuzzyFilter(items: IItems[]) {
  const [fuzzyItems, setFuzzyItems] = useState(items);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    setFuzzyItems(items);
  }, [items]);

  useEffect(() => {
    filterFuzzyItems(filter);
  }, [filter]);

  const findWord = (word: string, str: string) => {
    return RegExp(word, "i").test(str);
  };

  const filterFuzzyItems = (value: string) => {
    const newItems = items.filter(item => findWord(value, item.label));
    setFuzzyItems(newItems);
  };

  const handleInputChange = (inputValue?: string) => {
    if (!inputValue) {
      setFilter("");
      setFuzzyItems(items);
      return;
    }
    setFilter(inputValue);
  };


  return {
    fuzzyItems,
    handleInputChange,
  };
}
