import { FormGroup, Column, Row } from "carbon-components-react";
import { IPhoneInput } from "@/modules/profile/types";
import { Label, Select, TextInput } from "@/modules/components";
import {
  ILabelComponent,
  ISelectComponent,
  ITextInputComponent,
} from "@/modules/components/types";
import { usePhoneInput } from "./usePhoneInput";

export type IPhoneInputProps = {
  phoneInput?: Partial<IPhoneInput>;
} & IPhoneInputDefinition &
  IPhoneInputConfig;

export interface IPhoneInputDefinition {
  phoneLabel: ILabelComponent;
  dataKindSelect: ISelectComponent;
  phoneTextInput: ITextInputComponent;
  phoneKindSelect: ISelectComponent;
  dataVisibilitySelect: ISelectComponent;
}

export interface IPhoneInputConfig {
  onChange?: (phoneInput: Partial<IPhoneInput>) => void;
}

export const PhoneInput: React.FC<IPhoneInputProps> = props => {
  const {
    phoneInput: initialPhoneInput,
    onChange,
    children,
    ...definition
  } = props;

  const { dataKind, phone, phoneKind, dataVisibility } = usePhoneInput(
    initialPhoneInput,
    onChange
  );

  const {
    phoneLabel,
    dataKindSelect,
    phoneTextInput,
    phoneKindSelect,
    dataVisibilitySelect,
  } = definition;

  return (
    <FormGroup legendText={<Label {...phoneLabel} />}>
      <Row>
        <Column md={1} lg={1}>
          <Select {...dataKind} {...dataKindSelect} />
        </Column>
        <Column md={3} lg={3}>
          <TextInput {...phone} {...phoneTextInput} />
        </Column>
        <Column md={1} lg={1}>
          <Select {...phoneKind} {...phoneKindSelect} />
        </Column>
        <Column md={1} lg={1}>
          <Select {...dataVisibility} {...dataVisibilitySelect} />
        </Column>
        <Column md={1} lg={1}>
          {children}
        </Column>
      </Row>
    </FormGroup>
  );
};
