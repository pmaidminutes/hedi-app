import { FormGroup, FormGroupProps, Row } from "carbon-components-react";
import { Add32, TrashCan32 } from "@carbon/icons-react";
import { IEmailInput } from "@/modules/profile/types";
import { IButtonComponent, ILabelComponent } from "@/modules/components/types";
import { Button, Label } from "@/modules/components";
import { useInteractiveList } from "@/modules/react/hooks";
import { EmailInput, IEmailInputDefinition } from "./EmailInput";

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
