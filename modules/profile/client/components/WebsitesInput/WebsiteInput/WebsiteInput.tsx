import { FormGroup, Column, Row } from "carbon-components-react";
import { IWebsiteInput } from "@/modules/profile/types";
import { Label, Select, TextInput } from "@/modules/components";
import {
  Label as ILabel,
  Select as ISelect,
  TextInput as ITextInput,
} from "@/modules/model/components";
import { useWebsiteInput } from "./useWebsiteInput";

export type IWebsiteInputProps = {
  websiteInput?: Partial<IWebsiteInput>;
} & IWebsiteInputDefinition &
  IWebsiteInputConfig;

export interface IWebsiteInputDefinition {
  websiteLabel: ILabel;
  dataKindSelect: ISelect;
  websiteTextInput: ITextInput;
  dataVisibilitySelect: ISelect;
}

export interface IWebsiteInputConfig {
  onChange?: (websiteInput: Partial<IWebsiteInput>) => void;
}

export const WebsiteInput: React.FC<IWebsiteInputProps> = props => {
  const {
    websiteInput: initialWebsiteInput,
    onChange,
    children,
    ...definition
  } = props;

  const { dataKind, website, dataVisibility } = useWebsiteInput(
    initialWebsiteInput,
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
