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
  addresses?: Partial<IAddressInput>[];
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
    addresses,
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
  } = useInteractiveList(addresses);

  return (
    <FormGroup legendText={<Label {...addressesLabel} />} {...formGroupProps}>
      {addressInputs.map((a, i) => (
        <AddressInput
          addressInput={a}
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
