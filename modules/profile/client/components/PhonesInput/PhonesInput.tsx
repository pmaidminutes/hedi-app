import { FormGroup, FormGroupProps, Row } from "carbon-components-react";
import { Add32, TrashCan32 } from "@carbon/icons-react";
import {
  IButtonComponent,
  Button,
  ILabelComponent,
  Label,
} from "@/modules/components";
import { useInteractiveList } from "@/modules/react/hooks";
import { IPhoneInput, PhoneInputDefault } from "../../../types";
import { PhoneInput, IPhoneInputDefinition } from "./PhoneInput";

export type IPhonesInputProps = {
  value?: IPhoneInput[];
} & IPhonesInputDefinition &
  IPhonesInputConfig &
  Partial<Omit<FormGroupProps, "onChange">>;

export interface IPhonesInputDefinition {
  phoneInputDefinition: IPhoneInputDefinition;
  phonesLabel: ILabelComponent;
  addButton: IButtonComponent;
  removeButton: IButtonComponent;
}

interface IPhonesInputConfig {
  defaultItem?: IPhoneInput;
  onChange?: (phones: IPhoneInput[]) => void;
}

export const PhonesInput = (props: IPhonesInputProps) => {
  const {
    value,
    phoneInputDefinition,
    phonesLabel,
    addButton,
    removeButton,
    defaultItem,
    onChange,
    ...formGroupProps
  } = props;

  const {
    list: phoneInputs,
    handleAddClick,
    handleRemoveClick,
    handleItemChange,
  } = useInteractiveList(defaultItem ?? PhoneInputDefault, value, onChange);

  return (
    <FormGroup legendText={<Label {...phonesLabel} />} {...formGroupProps}>
      {phoneInputs.map((value, i) => (
        <PhoneInput
          value={value}
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
