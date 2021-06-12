import { FormGroup, Column, Row } from "carbon-components-react";
import {
  ILabelComponent,
  Label,
  ISelectComponent,
  Select,
  ITextInputComponent,
  TextInput,
} from "@/modules/components";
import { IPhoneInput } from "../../../../types";
import { usePhoneInput } from "./usePhoneInput";

export type IPhoneInputProps = {
  value?: Partial<IPhoneInput>;
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
  const { value, onChange, children, ...definition } = props;

  const { dataKind, phone, phoneKind, dataVisibility } = usePhoneInput(
    value,
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
