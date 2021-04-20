import { IEntity, IUIElementTexts } from "@/modules/model";
import { IWithKey } from "@/modules/model/IWithKey";
import { IShellLink } from "@/modules/shell/types/shellLinks";
import { TextInputProps } from "carbon-components-react";

export const hasElement = (identifier: string, elements?: IUIElementTexts[]) =>
  !!elements?.find(item => item.identifier === identifier);

export const getUIElement = (
  identifier: string,
  elements?: IUIElementTexts[]
): IUIElementTexts | undefined =>
  elements?.find(item => item.identifier === identifier);

export const getUIElementValue = (
  identifier: string,
  elements?: IUIElementTexts[],
  fallback?: string
): string =>
  elements?.find(item => item.identifier === identifier)?.value ??
  fallback ??
  identifier;

export const getUIElementRedirectRoute = (
  identifier: string,
  elements?: IUIElementTexts[],
  links?: (IEntity & IWithKey)[],
  fallback?: string
): string =>
  links?.find(item => item.key === getUIElementValue(identifier, elements))
    ?.route ??
  fallback ??
  identifier;

export const getTextInputProps = (
  identifier: string,
  elements?: IUIElementTexts[]
): Pick<
  TextInputProps,
  "id" | "labelText" | "placeholder" | "helperText" | "aria-label"
> => {
  const element = elements?.find(item => item.identifier === identifier);
  return {
    id: identifier,
    labelText: element?.value ?? identifier,
    placeholder: element?.placeholder,
    helperText: element?.help,
    "aria-label": element?.description,
  };
};
export const getMenuLinkLabel = (
  key: string,
  links?: IShellLink[],
  fallback?: string
): string => {
  const link = links?.find(item => item.key === key);
  if (!link) return fallback ?? key;
  return link.longTitle ?? link.label ?? fallback ?? key;
};

export const getLinkLabel = (
  key: string,
  links?: IShellLink[],
  fallback?: string
): string => links?.find(item => item.key === key)?.label ?? fallback ?? "/";
