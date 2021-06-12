import { FormGroup, FormGroupProps, Row } from "carbon-components-react";
import { Add32, TrashCan32 } from "@carbon/icons-react";
import {
  IButtonComponent,
  Button,
  ILabelComponent,
  Label,
} from "@/modules/components";
import { useInteractiveList } from "@/modules/react/hooks";
import { IWebsiteInput } from "../../../types";
import { WebsiteInput, IWebsiteInputDefinition } from "./WebsiteInput";

export type IWebsitesInputProps = {
  value?: Partial<IWebsiteInput>[];
} & IWebsitesInputDefinition &
  Partial<FormGroupProps>;

export interface IWebsitesInputDefinition {
  websiteInputDefinition: IWebsiteInputDefinition;
  websitesLabel: ILabelComponent;
  addButton: IButtonComponent;
  removeButton: IButtonComponent;
}

export const WebsitesInput = (props: IWebsitesInputProps) => {
  const {
    value,
    websiteInputDefinition,
    websitesLabel,
    addButton,
    removeButton,
    ...formGroupProps
  } = props;

  const {
    list: websiteInputs,
    handleAddClick,
    handleRemoveClick,
    handleItemChange,
  } = useInteractiveList(value);

  return (
    <FormGroup legendText={<Label {...websitesLabel} />} {...formGroupProps}>
      {websiteInputs.map((value, i) => (
        <WebsiteInput
          value={value}
          {...websiteInputDefinition}
          onChange={item => handleItemChange(item, i)}>
          <Button
            {...removeButton}
            hasIconOnly
            renderIcon={TrashCan32}
            onClick={_ => handleRemoveClick(i)}
          />
        </WebsiteInput>
      ))}
      <Row>
        <Button {...addButton} renderIcon={Add32} onClick={handleAddClick} />
      </Row>
    </FormGroup>
  );
};
