import { FormGroup, FormGroupProps, Row } from "carbon-components-react";
import { Add32, TrashCan32 } from "@carbon/icons-react";
import { IPhoneInput } from "@/modules/profile/types";
import { Button as IButton, Label as ILabel } from "@/modules/model/components";
import { Button, Label } from "@/modules/components";
import { useInteractiveList } from "@/modules/react/hooks";
import { PhoneInput, IPhoneInputDefinition } from "./PhoneInput";

export type IPhonesInputProps = {
  phones?: Partial<IPhoneInput>[];
} & IPhonesInputDefinition &
  Partial<FormGroupProps>;

export interface IPhonesInputDefinition {
  phoneInputDefinition: IPhoneInputDefinition;
  phonesLabel: ILabel;
  addButton: IButton;
  removeButton: IButton;
}

export const PhonesInput = (props: IPhonesInputProps) => {
  const {
    phones,
    phoneInputDefinition,
    phonesLabel,
    addButton,
    removeButton,
    ...formGroupProps
  } = props;

  const {
    list: phoneInputs,
    handleAddClick,
    handleRemoveClick,
    handleItemChange,
  } = useInteractiveList(phones);

  return (
    <FormGroup legendText={<Label {...phonesLabel} />} {...formGroupProps}>
      {phoneInputs.map((a, i) => (
        <PhoneInput
          phoneInput={a}
          {...phoneInputDefinition}
          onChange={item => handleItemChange(item, i)}>
          <Button
            {...removeButton}
            hasIconOnly
            renderIcon={TrashCan32}
            onClick={_ => handleRemoveClick(i)}
          />
        </PhoneInput>
      ))}
      <Row>
        <Button {...addButton} renderIcon={Add32} onClick={handleAddClick} />
      </Row>
    </FormGroup>
  );
};
