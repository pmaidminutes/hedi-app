import { IEntity, IUIElementTexts } from "@/modules/model";
import { IShellLink } from "@/modules/shell/types/shellLinks";
import { TextInputProps } from "carbon-components-react";

export const hasElement = (identifier: string, elements?: IUIElementTexts[]) =>
  !!elements?.find(item => item.identifier === identifier);

export const tryGet = (
  identifier: string,
  elements?: IUIElementTexts[]
): IUIElementTexts | undefined =>
  elements?.find(item => item.identifier === identifier);

export const tryGetValue = (
  identifier: string,
  elements?: IUIElementTexts[],
  fallback?: string
): string =>
  elements?.find(item => item.identifier === identifier)?.value ??
  fallback ??
  identifier;

export const tryGetRedirect = (
  identifier: string,
  elements?: IUIElementTexts[],
  links?: (IEntity & { key: string })[],
  fallback?: string
): string =>
  links?.find(item => item.key === tryGetValue(identifier, elements))?.route ??
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
export const tryGetKeyLabel = (
  key: string,
  links?: IShellLink[],
  fallback?: string
): string => links?.find(item => item.key === key)?.label ?? fallback ?? key;

export const tryGetKeyLinks = (
  key: string,
  links?: IShellLink[],
  fallback?: string
): string => links?.find(item => item.key === key)?.label ?? fallback ?? "/";
