import { FormGroup, Column, Row } from "carbon-components-react";
import {
  ILabelComponent,
  Label,
  ISelectComponent,
  Select,
  ITextInputComponent,
  TextInput,
  INumberInputComponent,
  NumberInput,
} from "@/modules/components";
import { AddressInputDefault, IAddressInput } from "../../../../types";
import { useAddressInput } from "./useAddressInput";

export type IAddressInputProps = {
  value?: IAddressInput;
} & IAddressInputDefinition &
  IAddressInputConfig;

export interface IAddressInputDefinition {
  addressLabel: ILabelComponent;
  dataKindSelect: ISelectComponent;
  cityTextInput: ITextInputComponent;
  postalCodeNumberInput: INumberInputComponent;
  cityVisibilitySelect: ISelectComponent;
  streetTextInput: ITextInputComponent;
  streetNumberTextInput: ITextInputComponent;
  additionalInfoTextInput: ITextInputComponent;
  streetVisibilitySelect: ISelectComponent;
}

export interface IAddressInputConfig {
  defaultValue?: IAddressInput;
  onChange?: (addressInput: IAddressInput) => void;
}

export const AddressInput: React.FC<IAddressInputProps> = props => {
  const { value, defaultValue, onChange, children, ...definition } = props;

  const {
    dataKind,
    city,
    postalCode,
    cityVisibility,
    street,
    streetNumber,
    streetVisibility,
    additionalInfo,
  } = useAddressInput(value ?? defaultValue ?? AddressInputDefault, onChange);

  const {
    addressLabel,
    dataKindSelect,
    cityTextInput,
    postalCodeNumberInput,
    cityVisibilitySelect,
    streetTextInput,
    streetNumberTextInput,
    additionalInfoTextInput,
    streetVisibilitySelect,
  } = definition;

  return (
    <FormGroup legendText={<Label {...addressLabel} />}>
      <Row>
        <Column>
          <Select {...dataKind} {...dataKindSelect} />
        </Column>
      </Row>
      <Row>
        <Column md={6} lg={6}>
          <TextInput {...city} {...cityTextInput} />
        </Column>
        <Column md={1} lg={1}>
          <NumberInput {...postalCode} {...postalCodeNumberInput} />
        </Column>
        <Column md={1} lg={1}>
          <Select {...cityVisibility} {...cityVisibilitySelect} />
        </Column>
      </Row>
      <Row>
        <Column md={6} lg={6}>
          <TextInput {...street} {...streetTextInput} />
        </Column>
        <Column lg={2} md={2}>
          <TextInput {...streetNumber} {...streetNumberTextInput} />
        </Column>
      </Row>
      <Row>
        <Column md={7} lg={7}>
          <TextInput {...additionalInfo} {...additionalInfoTextInput} />
        </Column>
        <Column lg={1} md={1}>
          <Select {...streetVisibility} {...streetVisibilitySelect} />
        </Column>
      </Row>
      <Row>{children}</Row>
    </FormGroup>
  );
};
