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
  IButtonComponent,
  Button,
  ILabelComponent,
  Label,
} from "@/modules/components";
import { ILanguageLevelInput, LanguageLevelInputDefault } from "../../../types";
import {
  ILanguageLevelInputDefinition,
  LanguageLevelInput,
} from "./LanguageLevelInput";
import { useInteractiveList } from "@/modules/react/hooks";

export type ILanguageSkillsInputProps = {
  value?: Partial<ILanguageLevelInput>[];
} & ILanguageSkillsInputDefinition &
  ILanguageSkillsInputConfig &
  Partial<Omit<FormGroupProps, "onChange">>;

export interface ILanguageSkillsInputDefinition {
  languageSkillsLabel: ILabelComponent;
  languageTitle?: string;
  levelTitle?: string;
  languageLevelInputDefinition: ILanguageLevelInputDefinition;
  addButton: IButtonComponent;
  removeButton: IButtonComponent;
}

interface ILanguageSkillsInputConfig {
  defaultItem?: ILanguageLevelInput;
  onChange?: (languageLevels: Partial<ILanguageLevelInput>[]) => void;
}

export const LanguageSkillsInput = (props: ILanguageSkillsInputProps) => {
  const {
    value,
    languageSkillsLabel,
    languageTitle,
    levelTitle,
    languageLevelInputDefinition,
    addButton,
    removeButton,
    defaultItem,
    onChange,
    ...formGroupProps
  } = props;

  const {
    list: languageLevelInputs,
    handleAddClick,
    handleRemoveClick,
    handleItemChange,
  } = useInteractiveList(
    defaultItem ?? LanguageLevelInputDefault,
    value,
    onChange
  );
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
              {languageLevelInputs?.map((value, i) => (
                <LanguageLevelInput
                  value={value}
                  key={`${value?.langcode}${i}`}
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
