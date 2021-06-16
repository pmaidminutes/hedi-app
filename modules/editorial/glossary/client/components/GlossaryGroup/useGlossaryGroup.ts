import { useState, useEffect } from "react";
import { IGlossaryKeyGroup } from "../../../types";

export interface IGlossaryGroupProps {
  glossaryKeyGroup: IGlossaryKeyGroup;
  translationLang?: string;
  selectedTerm?: string;
}

export function useGlossaryGroup(props: IGlossaryGroupProps) {
  const { selectedTerm, translationLang, glossaryKeyGroup } = props;
  const { keyChar, terms } = glossaryKeyGroup;
  const [termUpdated, setTermUpdated] = useState("");
  useEffect(() => {
    setTermUpdated(selectedTerm ?? "");
  }, [selectedTerm]);

  return {
    glossaryKey: keyChar,
    glossaryTerms: terms,
    translationLang,
    termUpdated,
  };
}
