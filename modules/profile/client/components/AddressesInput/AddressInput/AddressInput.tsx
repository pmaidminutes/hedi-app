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
import { IAddressInput } from "../../../../types";
import { useAddressInput } from "./useAddressInput";

export type IAddressInputProps = {
  value?: IAddressInput;
} & IAddressInputDefinition &
  IAddressInputConfig;

export interface IAddressInputDefinition {
  addressLabel: ILabelComponent;
  dataVisibilitySelect: ISelectComponent;
  dataKindSelect: ISelectComponent;
  cityTextInput: ITextInputComponent;
  postalCodeNumberInput: INumberInputComponent;
  detailsVisibilitySelect: ISelectComponent;
  streetTextInput: ITextInputComponent;
  streetNumberTextInput: ITextInputComponent;
  additionalInfoTextInput: ITextInputComponent;
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
    dataVisibility,
    street,
    streetNumber,
    detailsVisibility,
    additionalInfo,
  } = useAddressInput(value, defaultValue, onChange);

  const {
    addressLabel,
    dataKindSelect,
    dataVisibilitySelect,
    cityTextInput,
    postalCodeNumberInput,
    detailsVisibilitySelect,
    streetTextInput,
    streetNumberTextInput,
    additionalInfoTextInput,
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
          <Select {...dataVisibility} {...dataVisibilitySelect} />
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
          <Select {...detailsVisibility} {...detailsVisibilitySelect} />
        </Column>
      </Row>
      <Row>{children}</Row>
    </FormGroup>
  );
};
