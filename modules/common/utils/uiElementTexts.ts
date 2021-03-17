import { IUIElementTexts } from "@/modules/model";
import { TextInputProps } from "carbon-components-react";

export const tryGetValue = (
  identifier: string,
  elements: IUIElementTexts[]
): string =>
  elements.find(item => item.identifier === identifier)?.value ?? identifier;

export const getTextInputProps = (
  identifier: string,
  elements: IUIElementTexts[]
): Pick<
  TextInputProps,
  "id" | "labelText" | "placeholder" | "helperText" | "aria-label"
> => {
  const element = elements.find(item => item.identifier === identifier);
  return {
    id: identifier,
    labelText: element?.value ?? identifier,
    placeholder: element?.placeholder,
    helperText: element?.help,
    "aria-label": element?.description,
  };
};
