import { useState, useEffect } from "react";
import { IGlossaryGroup } from "../../../types";

export interface IGlossaryGroupProps {
  glossaryGroup: IGlossaryGroup;
  translationLang?: string;
  selectedTerm?: string;
}

export function useGlossaryGroup(props: IGlossaryGroupProps) {
  const { selectedTerm, translationLang, glossaryGroup } = props;
  const { key, terms } = glossaryGroup;
  const [termUpdated, setTermUpdated] = useState("");
  useEffect(() => {
    setTermUpdated(selectedTerm ?? "");
  }, [selectedTerm]);

  return {
    groupKey: key,
    groupTerms: terms,
    translationLang,
    termUpdated,
  };
}
