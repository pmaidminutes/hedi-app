import { SelectItem } from "@/modules/components";
import { useState, useEffect } from "react";
const fallbackSelectItem = { label: "", route: "" };

// TODO make multiple search words possible
export function useFuzzyFilter(
  items: SelectItem[],
  onChange?: (item: SelectItem) => void,
  value?: SelectItem,
  defaultValue?: SelectItem
) {
  const [fuzzyItems, setFuzzyItems] = useState(items);
  const [fuzzyValue, setFuzzyValue] = useState<SelectItem>(
    value ?? defaultValue ?? fallbackSelectItem
  );
  const [initialValue, setInitialValue] = useState(value ?? null);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    setFuzzyItems(items);
  }, [items]);

  useEffect(() => {
    setFuzzyValue(value ?? defaultValue ?? fallbackSelectItem);
  }, [value, defaultValue]);

  useEffect(() => {
    setInitialValue(value ?? null);
  }, [value]);

  useEffect(() => {
    filterFuzzyItems(filter);
  }, [filter]);

  const hasWord = (word: string, str: string) => {
    return RegExp(word, "i").test(str);
  };

  const filterFuzzyItems = (value: string) => {
    const newItems = items.filter(item => hasWord(value, item.label));
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

  const handleChange = (value?: SelectItem) => {
    if (value && onChange) {
      onChange(value);
      setFuzzyValue(value);
    }
  };

  return {
    fuzzyItems,
    handleInputChange,
    handleChange,
    fuzzyValue,
    initialValue,
    filter
  };
}
