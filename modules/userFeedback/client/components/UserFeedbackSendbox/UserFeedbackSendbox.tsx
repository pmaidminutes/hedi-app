import { IUIElementTexts } from "@/modules/model";
import { Button } from "carbon-components-react";

export interface IUserFeedbackSendboxProps {
  elements: IUIElementTexts[];
}

export const UserFeedbackSendbox = ({
  elements,
}: IUserFeedbackSendboxProps) => {
  const getUIElement = (identifier: string) => {
    return elements.find(item => item.identifier === identifier);
  };

  return (
    <Button type="submit" size="field">
      {getUIElement("submit")?.value || "Submit"}
    </Button>
  );
};
