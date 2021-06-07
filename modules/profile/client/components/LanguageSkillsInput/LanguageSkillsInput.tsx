import {
  Column,
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "carbon-components-react";
import { Add32 } from "@carbon/icons-react";
import {
  ILanguageLevelInputDefinition,
  LanguageLevelInput,
} from "./LanguageLevelInput";
import { useLanguageSkillsInput } from "./useLanguageSkillsInput";
import { ILanguageLevel } from "@/modules/profile/types";
import { Button as IButton } from "@/modules/model/components";
import { Button } from "@/modules/components";

export type ILanguageSkillsInputProps = {
  languageLevels?: ILanguageLevel[];
} & ILanguageSkillsInputDefinition;

export interface ILanguageSkillsInputDefinition {
  languageTitle?: string;
  levelTitle?: string;
  languageLevelInputDefinition: ILanguageLevelInputDefinition;
  addButton: IButton;
}

export const LanguageSkillsInput = (props: ILanguageSkillsInputProps) => {
  const {
    languageLevels,
    languageTitle,
    levelTitle,
    languageLevelInputDefinition,
    addButton,
  } = props;
  const {
    languageLevelInputs,
    handleAddClick,
    handleRemoveClick,
    handleItemChange,
  } = useLanguageSkillsInput(languageLevels);
  return (
    <>
      <Column>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>{languageTitle ?? "Sprache"}</TableHeader>
              <TableHeader>{levelTitle ?? "Verständnis"}</TableHeader>
              <TableHeader>
                <Button
                  {...addButton}
                  renderIcon={Add32}
                  onClick={handleAddClick}
                />
              </TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {languageLevelInputs?.map((lli, i) => (
              <LanguageLevelInput
                languageLevelInput={lli}
                key={lli.langcode + i}
                {...languageLevelInputDefinition}
                onRemoveClick={() => {
                  handleRemoveClick(i);
                }}
                onChange={changedData => handleItemChange(i, changedData)}
              />
            ))}
          </TableBody>
        </Table>
      </Column>
      <Column>
        <Button
          {...addButton}
          className="mobile-only"
          hasIconOnly={true}
          renderIcon={Add32}
          onClick={handleAddClick}
        />
      </Column>
    </>
  );
};
