import {
  Column,
  FormGroup,
  FormGroupProps,
  Row,
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "carbon-components-react";
import { Add32, TrashCan32 } from "@carbon/icons-react";
import {
  ILanguageLevelInputDefinition,
  LanguageLevelInput,
} from "./LanguageLevelInput";
import { ILanguageLevel } from "@/modules/profile/types";
import { IButtonComponent, ILabelComponent } from "@/modules/components/types";
import { Button, Label } from "@/modules/components";
import { useInteractiveList } from "@/modules/react/hooks";

export type ILanguageSkillsInputProps = {
  languageLevels?: Partial<ILanguageLevel>[];
} & ILanguageSkillsInputDefinition &
  Partial<FormGroupProps>;

export interface ILanguageSkillsInputDefinition {
  languageSkillsLabel: ILabelComponent;
  languageTitle?: string;
  levelTitle?: string;
  languageLevelInputDefinition: ILanguageLevelInputDefinition;
  addButton: IButtonComponent;
  removeButton: IButtonComponent;
}

export const LanguageSkillsInput = (props: ILanguageSkillsInputProps) => {
  const {
    languageSkillsLabel,
    languageLevels,
    languageTitle,
    levelTitle,
    languageLevelInputDefinition,
    addButton,
    removeButton,
    ...formGroupProps
  } = props;
  const {
    list: languageLevelInputs,
    handleAddClick,
    handleRemoveClick,
    handleItemChange,
  } = useInteractiveList(languageLevels);
  return (
    <FormGroup
      legendText={<Label {...languageSkillsLabel} />}
      {...formGroupProps}>
      <Row>
        <Column>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeader>{languageTitle}</TableHeader>
                <TableHeader>{levelTitle}</TableHeader>
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
                  key={`${lli?.langcode}${i}`}
                  {...languageLevelInputDefinition}
                  onChange={item => handleItemChange(item, i)}>
                  <Button
                    {...removeButton}
                    hasIconOnly
                    renderIcon={TrashCan32}
                    onClick={_ => handleRemoveClick(i)}
                  />
                </LanguageLevelInput>
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
      </Row>
    </FormGroup>
  );
};
