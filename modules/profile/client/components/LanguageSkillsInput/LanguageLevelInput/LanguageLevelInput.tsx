import { TableCell, TableRow } from "carbon-components-react";
import { TrashCan32 } from "@carbon/icons-react";
import { ILanguageLevelInput } from "@/modules/profile/types";
import {
  Select as ISelect,
  Button as IButton,
} from "@/modules/model/components";
import { Select, Button } from "@/modules/components";
import { useLanguageLevelInput } from "./useLanguageLevelInput";

export type ILanguageLevelInputProps = {
  languageLevelInput?: ILanguageLevelInput;
} & ILanguageLevelInputDefinition &
  ILanguageLevelInputConfig;

export interface ILanguageLevelInputDefinition {
  languageTitle?: string;
  languageSelect: ISelect;
  levelTitle?: string;
  levelSelect: ISelect;
  removeButton: IButton;
}

interface ILanguageLevelInputConfig {
  onRemoveClick?: () => void;
  onChange?: (languageLevelInput: ILanguageLevelInput) => void;
}

export const LanguageLevelInput = (props: ILanguageLevelInputProps) => {
  const {
    languageLevelInput: initialLanguageLevelInput,
    languageTitle,
    languageSelect,
    levelTitle,
    levelSelect,
    removeButton,
    onRemoveClick,
    onChange,
  } = props;

  const {
    languageLevelInput,
    handleLangcodeChange,
    handleLevelChange,
  } = useLanguageLevelInput(initialLanguageLevelInput, onChange);
  return (
    <TableRow>
      <TableCell data-th={languageTitle}>
        <Select
          {...languageSelect}
          value={languageLevelInput?.langcode}
          onChange={handleLangcodeChange}
        />
      </TableCell>
      <TableCell data-th={levelTitle}>
        <Select
          {...levelSelect}
          value={languageLevelInput?.level}
          onChange={handleLevelChange}
        />
      </TableCell>
      <TableCell>
        <Button
          {...removeButton}
          renderIcon={TrashCan32}
          hasIconOnly
          onClick={onRemoveClick}
        />
        <input
          id="languageLevel"
          name="languageLevel"
          readOnly
          value={JSON.stringify(languageLevelInput)}
          hidden
        />
      </TableCell>
    </TableRow>
  );
};
