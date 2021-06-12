import { FormGroup, FormGroupProps, Row } from "carbon-components-react";
import { Add32, TrashCan32 } from "@carbon/icons-react";
import { useInteractiveList } from "@/modules/react/hooks";
import {
  IButtonComponent,
  Button,
  ILabelComponent,
  Label,
} from "@/modules/components";
import { IAddressInput } from "../../../types";
import { AddressInput, IAddressInputDefinition } from "./AddressInput";

export type IAddressesInputProps = {
  value?: Partial<IAddressInput>[];
} & IAddressesInputDefinition &
  Partial<FormGroupProps>;

export interface IAddressesInputDefinition {
  addressInputDefinition: IAddressInputDefinition;
  addressesLabel: ILabelComponent;
  addButton: IButtonComponent;
  removeButton: IButtonComponent;
}

export const AddressesInput = (props: IAddressesInputProps) => {
  const {
    value,
    addressInputDefinition,
    addressesLabel,
    addButton,
    removeButton,
    ...formGroupProps
  } = props;

  const {
    list: addressInputs,
    handleAddClick,
    handleRemoveClick,
    handleItemChange,
  } = useInteractiveList(value);

  return (
    <FormGroup legendText={<Label {...addressesLabel} />} {...formGroupProps}>
      {addressInputs.map((value, i) => (
        <AddressInput
          value={value}
          {...addressInputDefinition}
          onChange={item => handleItemChange(item, i)}>
          <Button
            {...removeButton}
            hasIconOnly
            renderIcon={TrashCan32}
            onClick={_ => handleRemoveClick(i)}
          />
        </AddressInput>
      ))}
      <Row>
        <Button {...addButton} renderIcon={Add32} onClick={handleAddClick} />
      </Row>
    </FormGroup>
  );
};
