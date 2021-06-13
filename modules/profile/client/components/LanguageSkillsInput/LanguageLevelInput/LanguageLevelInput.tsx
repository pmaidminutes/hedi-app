import { TableCell, TableRow } from "carbon-components-react";
import { ISelectComponent, Select } from "@/modules/components";
import {
  ILanguageLevelInput,
  LanguageLevelInputDefault,
} from "../../../../types";
import { useLanguageLevelInput } from "./useLanguageLevelInput";

export type ILanguageLevelInputProps = {
  value?: ILanguageLevelInput;
} & ILanguageLevelInputDefinition &
  ILanguageLevelInputConfig;

export interface ILanguageLevelInputDefinition {
  languageTitle?: string;
  languageSelect: ISelectComponent;
  levelTitle?: string;
  levelSelect: ISelectComponent;
}

interface ILanguageLevelInputConfig {
  defaultValue?: ILanguageLevelInput;
  onChange?: (languageLevelInput: ILanguageLevelInput) => void;
}

export const LanguageLevelInput: React.FC<ILanguageLevelInputProps> = props => {
  const {
    value,
    languageTitle,
    languageSelect,
    levelTitle,
    levelSelect,
    defaultValue,
    onChange,
    children,
  } = props;

  const { langcode, level, state } = useLanguageLevelInput(
    value ?? defaultValue ?? LanguageLevelInputDefault,
    onChange
  );
  return (
    <TableRow>
      <TableCell data-th={languageTitle}>
        <Select {...langcode} {...languageSelect} />
      </TableCell>
      <TableCell data-th={levelTitle}>
        <Select {...level} {...levelSelect} />
      </TableCell>
      <TableCell>
        {children}
        <input
          id="languageLevel"
          name="languageLevel"
          readOnly
          value={JSON.stringify(state)}
          hidden
        />
      </TableCell>
    </TableRow>
  );
};
