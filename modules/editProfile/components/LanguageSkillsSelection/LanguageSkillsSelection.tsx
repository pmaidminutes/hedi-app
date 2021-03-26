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
import { tryGetValue } from "@/modules/common/utils";

export type LanguageSkillsSelectionProps = {
  config: {
    elements?: IUIElementTexts[];
    languageLevelElements: IUIElementTexts[];
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
    isMobileContext,
  } = useLanguageSkillsSelection(data);
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeader>
            {tryGetValue("language", config.elements, "Sprache")}
          </TableHeader>
          <TableHeader>
            {tryGetValue("level", config.elements, "Verständnis")}
          </TableHeader>
          <TableHeader>
            <Button
              hasIconOnly={isMobileContext}
              kind="tertiary"
              renderIcon={Add32}
              iconDescription={tryGetValue(
                "add-languageSkill",
                config.elements,
                "weitere Hinzufügen"
              )}
              onClick={handleAddClick}>
              {!isMobileContext
                ? tryGetValue(
                    "add-languageSkill",
                    config.elements,
                    "Hinzufügen"
                  )
                : null}
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
