import {
  Column,
  FormGroup,
  FormGroupProps,
  Row,
} from "carbon-components-react";
import {
  ILabelComponent,
  Label,
  ITextInputComponent,
  TextInput,
} from "@/modules/components";

export type IDetailedNameInputProps = {
  prefix?: string;
  givenName: string;
  familyName?: string;
} & IDetailedNameInputDefinition &
  Partial<FormGroupProps>;

export interface IDetailedNameInputDefinition {
  detailedNameLabel: ILabelComponent;
  prefixTextInput: ITextInputComponent;
  givenNameTextInput: ITextInputComponent;
  familyNameTextInput: ITextInputComponent;
}

export const DetailedNameInput: React.FC<IDetailedNameInputProps> = props => {
  const {
    prefix,
    givenName,
    familyName,
    detailedNameLabel,
    prefixTextInput,
    givenNameTextInput,
    familyNameTextInput,
    ...formGroupProps
  } = props;
  return (
    <FormGroup
      legendText={<Label {...detailedNameLabel} />}
      {...formGroupProps}>
      <Row>
        <Column lg={2} md={2}>
          <TextInput {...prefixTextInput} />
        </Column>
        <Column lg={6} md={6}>
          <TextInput {...givenNameTextInput} />
        </Column>
      </Row>
      <Row>
        <Column lg={6} md={6}>
          <TextInput {...familyNameTextInput} />
        </Column>
      </Row>
    </FormGroup>
  );
};
