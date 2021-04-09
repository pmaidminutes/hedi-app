import { Button, Dropdown, TableCell, TableRow } from "carbon-components-react";
import { TrashCan32 } from "@carbon/icons-react";
import { ILanguage, IUIElementTexts } from "@/modules/model";
import { ILanguageSkillEntry } from "../../../types";
import { useLanguageSkillRow } from "./hooks";
import { getUIElementValue } from "@/modules/common/utils";

export type LanguageSkillRowProps = {
  config: {
    elements?: IUIElementTexts[];
    languageLevelElements: IUIElementTexts[];
    languageOptions: ILanguage[];
  };
  data: ILanguageSkillEntry;
  handleDeleteClick?: () => void;
  handleChange?: (data: ILanguageSkillEntry) => void;
};

export const LanguageSkillRow = ({
  config: { elements, languageLevelElements, languageOptions },
  data,
  handleDeleteClick,
  handleChange,
}: LanguageSkillRowProps) => {
  // TODO add undefined entry for newly added rows
  const {
    languageSkill,
    handleLanguageChange,
    handleLevelChange,
  } = useLanguageSkillRow(data, handleChange);
  return (
    <TableRow>
      <TableCell data-th={getUIElementValue("language", elements, "Sprache")}>
        <Dropdown
          id="langcode"
          titleText=""
          label={getUIElementValue("language", elements, "Sprache")}
          light
          selectedItem={languageOptions.find(
            l => l.code === languageSkill.langcode
          )}
          items={languageOptions}
          itemToString={l => l.native}
          onChange={handleLanguageChange}
        />
      </TableCell>
      <TableCell data-th={getUIElementValue("level", elements, "Verständnis")}>
        <Dropdown
          id="level"
          label={
            languageLevelElements.find(
              element => parseInt(element.identifier) === 0
            )?.value ?? "Please Select"
          }
          ariaLabel={getUIElementValue("level", elements, "Verständnis")}
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
          renderIcon={TrashCan32}
          iconDescription={getUIElementValue(
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
