import { FormGroup, Column, Row } from "carbon-components-react";
import {
  ILabelComponent,
  Label,
  ISelectComponent,
  Select,
  ITextInputComponent,
  TextInput,
} from "@/modules/components";
import { IWebsiteInput } from "../../../../types";
import { useWebsiteInput } from "./useWebsiteInput";

export type IWebsiteInputProps = {
  value?: IWebsiteInput;
} & IWebsiteInputDefinition &
  IWebsiteInputConfig;

export interface IWebsiteInputDefinition {
  websiteLabel: ILabelComponent;
  dataKindSelect: ISelectComponent;
  websiteTextInput: ITextInputComponent;
  dataVisibilitySelect: ISelectComponent;
}

export interface IWebsiteInputConfig {
  defaultValue?: IWebsiteInput;
  onChange?: (websiteInput: IWebsiteInput) => void;
}

export const WebsiteInput: React.FC<IWebsiteInputProps> = props => {
  const { value, defaultValue, onChange, children, ...definition } = props;

  const { dataKind, website, dataVisibility } = useWebsiteInput(
    value,
    defaultValue,
    onChange
  );

  const {
    websiteLabel,
    dataKindSelect,
    websiteTextInput,
    dataVisibilitySelect,
  } = definition;

  return (
    <FormGroup legendText={<Label {...websiteLabel} />}>
      <Row>
        <Column md={1} lg={1}>
          <Select {...dataKind} {...dataKindSelect} />
        </Column>
        <Column md={4} lg={4}>
          <TextInput {...website} {...websiteTextInput} />
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
