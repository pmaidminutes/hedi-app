import { FormGroup, FormGroupProps, Row } from "carbon-components-react";
import { Add32, TrashCan32 } from "@carbon/icons-react";
import {
  IButtonComponent,
  Button,
  ILabelComponent,
  Label,
} from "@/modules/components";
import { EmailInputDefault, IEmailInput } from "../../../types";
import { EmailInput, IEmailInputDefinition } from "./EmailInput";
import { useInteractiveList } from "@/modules/react/hooks";

export type IEmailsInputProps = {
  value?: Partial<IEmailInput>[];
} & IEmailsInputDefinition &
  IEmailsInputConfig &
  Partial<Omit<FormGroupProps, "onChange">>;

export interface IEmailsInputDefinition {
  emailInputDefinition: IEmailInputDefinition;
  emailsLabel: ILabelComponent;
  addButton: IButtonComponent;
  removeButton: IButtonComponent;
}

interface IEmailsInputConfig {
  defaultItem?: IEmailInput;
  onChange?: (emails: Partial<IEmailInput>[]) => void;
}

export const EmailsInput = (props: IEmailsInputProps) => {
  const {
    value,
    emailInputDefinition,
    emailsLabel,
    addButton,
    removeButton,
    defaultItem,
    onChange,
    ...formGroupProps
  } = props;

  const {
    list: emailInputs,
    handleAddClick,
    handleRemoveClick,
    handleItemChange,
  } = useInteractiveList(defaultItem ?? EmailInputDefault, value, onChange);

  return (
    <FormGroup legendText={<Label {...emailsLabel} />} {...formGroupProps}>
      {emailInputs.map((value, i) => (
        <EmailInput
          value={value}
          {...emailInputDefinition}
          onChange={item => handleItemChange(item, i)}>
          <Button
            {...removeButton}
            hasIconOnly
            renderIcon={TrashCan32}
            onClick={_ => handleRemoveClick(i)}
          />
        </EmailInput>
      ))}
      <Row>
        <Button {...addButton} renderIcon={Add32} onClick={handleAddClick} />
      </Row>
    </FormGroup>
  );
};
