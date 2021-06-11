import { TableCell, TableRow } from "carbon-components-react";
import { ILanguageLevelInput } from "@/modules/profile/types";
import { ISelectComponent } from "@/modules/components/types";
import { Select } from "@/modules/components";
import { useLanguageLevelInput } from "./useLanguageLevelInput";

export type ILanguageLevelInputProps = {
  languageLevelInput?: Partial<ILanguageLevelInput>;
} & ILanguageLevelInputDefinition &
  ILanguageLevelInputConfig;

export interface ILanguageLevelInputDefinition {
  languageTitle?: string;
  languageSelect: ISelectComponent;
  levelTitle?: string;
  levelSelect: ISelectComponent;
}

interface ILanguageLevelInputConfig {
  onChange?: (languageLevelInput: Partial<ILanguageLevelInput>) => void;
}

export const LanguageLevelInput: React.FC<ILanguageLevelInputProps> = props => {
  const {
    languageLevelInput: initialLanguageLevelInput,
    languageTitle,
    languageSelect,
    levelTitle,
    levelSelect,
    children,
    onChange,
  } = props;

  const { langcode, level, state } = useLanguageLevelInput(
    initialLanguageLevelInput,
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
