import { FormGroup, Column, Row } from "carbon-components-react";
import {
  ILabelComponent,
  Label,
  ISelectComponent,
  Select,
  ITextInputComponent,
  TextInput,
} from "@/modules/components";
import { IEmailInput } from "../../../../types";
import { useEmailInput } from "./useEmailInput";

export type IEmailInputProps = {
  value?: Partial<IEmailInput>;
} & IEmailInputDefinition &
  IEmailInputConfig;

export interface IEmailInputDefinition {
  emailLabel: ILabelComponent;
  dataKindSelect: ISelectComponent;
  emailTextInput: ITextInputComponent;
  dataVisibilitySelect: ISelectComponent;
}

export interface IEmailInputConfig {
  onChange?: (emailInput: Partial<IEmailInput>) => void;
}

export const EmailInput: React.FC<IEmailInputProps> = props => {
  const { value, onChange, children, ...definition } = props;

  const { dataKind, email, dataVisibility } = useEmailInput(value, onChange);

  const {
    emailLabel,
    dataKindSelect,
    emailTextInput,
    dataVisibilitySelect,
  } = definition;

  return (
    <FormGroup legendText={<Label {...emailLabel} />}>
      <Row>
        <Column md={1} lg={1}>
          <Select {...dataKind} {...dataKindSelect} />
        </Column>
        <Column md={4} lg={4}>
          <TextInput {...email} {...emailTextInput} />
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
