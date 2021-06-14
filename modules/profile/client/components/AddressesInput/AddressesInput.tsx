import { FormGroup, FormGroupProps, Row } from "carbon-components-react";
import { Add32, TrashCan32 } from "@carbon/icons-react";
import { useInteractiveList } from "@/modules/react/hooks";
import {
  IButtonComponent,
  Button,
  ILabelComponent,
  Label,
} from "@/modules/components";
import { AddressInputDefault, IAddressInput } from "../../../types";
import { AddressInput, IAddressInputDefinition } from "./AddressInput";

export type IAddressesInputProps = {
  value?: IAddressInput[];
} & IAddressesInputDefinition &
  IAddressesInputConfig &
  Partial<Omit<FormGroupProps, "onChange">>;

export interface IAddressesInputDefinition {
  addressInputDefinition: IAddressInputDefinition;
  addressesLabel: ILabelComponent;
  addButton: IButtonComponent;
  removeButton: IButtonComponent;
}

interface IAddressesInputConfig {
  defaultItem?: IAddressInput;
  onChange?: (addresses: IAddressInput[]) => void;
}

export const AddressesInput = (props: IAddressesInputProps) => {
  const {
    value,
    addressInputDefinition,
    addressesLabel,
    addButton,
    removeButton,
    defaultItem,
    onChange,
    ...formGroupProps
  } = props;

  const {
    list: addressInputs,
    handleAddClick,
    handleRemoveClick,
    handleItemChange,
  } = useInteractiveList(defaultItem ?? AddressInputDefault, value, onChange);

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
