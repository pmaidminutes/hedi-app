import { Button, Dropdown, TableCell, TableRow } from "carbon-components-react";
import { Delete32 } from "@carbon/icons-react";
import { ILanguage, IUIElementTexts } from "@/modules/model";
import { ILanguageSkillEntry } from "../../types";
import { useLanguageSkillRow } from "./useLanguageSkillRow";
import { tryGetValue } from "@/modules/common/utils";

export type LanguageSkillRowProps = {
  config: {
    elements?: IUIElementTexts[];
    languageLevelElements: IUIElementTexts[];
    languageOptions: ILanguage[];
  };
  data: ILanguageSkillEntry;
  handleDeleteClick?: () => void;
};

export const LanguageSkillRow = ({
  config: { elements, languageLevelElements, languageOptions },
  data,
  handleDeleteClick,
}: LanguageSkillRowProps) => {
  // TODO add undefined entry for newly added rows
  const {
    languageSkill,
    handleLanguageChange,
    handleLevelChange,
  } = useLanguageSkillRow(data);
  return (
    <TableRow>
      <TableCell>
        <Dropdown
          id="langcode"
          titleText=""
          label={tryGetValue("language", elements, "Sprache")}
          light
          selectedItem={languageOptions.find(
            l => l.code === languageSkill.langcode
          )}
          items={languageOptions}
          itemToString={l => l.native}
          onChange={handleLanguageChange}
        />
      </TableCell>
      <TableCell>
        <Dropdown
          id="level"
          label={tryGetValue("level", elements, "Verständnis")}
          titleText=""
          light
          selectedItem={languageSkill.level}
          items={languageLevelElements.map(level => parseInt(level.identifier))}
          itemToString={i =>
            languageLevelElements.find(
              level => level.identifier == i.toString()
            )?.value || i.toString()
          }
          onChange={handleLevelChange}
        />
      </TableCell>
      <TableCell>
        <Button
          kind="ghost"
          renderIcon={Delete32}
          iconDescription={tryGetValue(
            "remove-languageSkill",
            elements,
            "Sprache"
          )}
          hasIconOnly
          onClick={handleDeleteClick}
        />
        <input
          id="languageSkill-data"
          name="languageSkills"
          readOnly
          value={JSON.stringify(languageSkill)}
          hidden
        />
      </TableCell>
    </TableRow>
  );
};
