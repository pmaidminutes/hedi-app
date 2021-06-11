import { FormGroup, FormGroupProps, Row } from "carbon-components-react";
import { Add32, TrashCan32 } from "@carbon/icons-react";
import { IWebsiteInput } from "@/modules/profile/types";
import { IButtonComponent, ILabelComponent } from "@/modules/components/types";
import { Button, Label } from "@/modules/components";
import { useInteractiveList } from "@/modules/react/hooks";
import { WebsiteInput, IWebsiteInputDefinition } from "./WebsiteInput";

export type IWebsitesInputProps = {
  websites?: Partial<IWebsiteInput>[];
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
    websites,
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
  } = useInteractiveList(websites);

  return (
    <FormGroup legendText={<Label {...websitesLabel} />} {...formGroupProps}>
      {websiteInputs.map((a, i) => (
        <WebsiteInput
          websiteInput={a}
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
