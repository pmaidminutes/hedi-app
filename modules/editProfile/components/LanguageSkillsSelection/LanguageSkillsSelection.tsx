import {
  Button,
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "carbon-components-react";
import { Add32 } from "@carbon/icons-react";
import { ILanguage, IUIElementTexts } from "@/modules/model";
import { ILanguageSkillEntry } from "../../types";
import { LanguageSkillRow } from "./LanguageSkillRow";
import { useLanguageSkillsSelection } from "./useLanguageSkillsSelection";

export type LanguageSkillsSelectionProps = {
  config: {
    elements?: IUIElementTexts[];
    languageOptions: ILanguage[];
  };
  data?: ILanguageSkillEntry[];
};

export const LanguageSkillsSelection = ({
  config,
  data,
}: LanguageSkillsSelectionProps) => {
  const {
    languageSkillEntries,
    handleAddClick,
    handleRemoveClick,
  } = useLanguageSkillsSelection(data);
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>Sprache</TableHeader>
          <TableHeader>Fähigkeit</TableHeader>
          <TableHeader>
            <Button
              kind="tertiary"
              renderIcon={Add32}
              iconDescription="weitere Hinzufügen"
              onClick={handleAddClick}>
              weitere
            </Button>
          </TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {languageSkillEntries?.map((ls, i) => (
          <LanguageSkillRow
            key={ls.langcode + i}
            config={config}
            data={ls}
            handleDeleteClick={() => {
              handleRemoveClick(i);
            }}
          />
        ))}
      </TableBody>
    </Table>
  );
};
