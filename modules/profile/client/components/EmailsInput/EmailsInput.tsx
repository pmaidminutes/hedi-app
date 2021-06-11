import { FormGroup, FormGroupProps, Row } from "carbon-components-react";
import { Add32, TrashCan32 } from "@carbon/icons-react";
import {
  IButtonComponent,
  Button,
  ILabelComponent,
  Label,
} from "@/modules/components";
import { IEmailInput } from "../../../types";
import { EmailInput, IEmailInputDefinition } from "./EmailInput";
import { useInteractiveList } from "@/modules/react/hooks";

export type IEmailsInputProps = {
  emails?: Partial<IEmailInput>[];
} & IEmailsInputDefinition &
  Partial<FormGroupProps>;

export interface IEmailsInputDefinition {
  emailInputDefinition: IEmailInputDefinition;
  emailsLabel: ILabelComponent;
  addButton: IButtonComponent;
  removeButton: IButtonComponent;
}

export const EmailsInput = (props: IEmailsInputProps) => {
  const {
    emails,
    emailInputDefinition,
    emailsLabel,
    addButton,
    removeButton,
    ...formGroupProps
  } = props;

  const {
    list: emailInputs,
    handleAddClick,
    handleRemoveClick,
    handleItemChange,
  } = useInteractiveList(emails);

  return (
    <FormGroup legendText={<Label {...emailsLabel} />} {...formGroupProps}>
      {emailInputs.map((a, i) => (
        <EmailInput
          emailInput={a}
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
