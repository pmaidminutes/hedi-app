export interface IUIElementTexts {
  identifier: string;
  value: string;
  description: string;
  help?: string;
  placeholder?: string;
}

export const implementsIUIElementTexts = (obj: any) =>
  !!(obj && obj.identifier && obj.value && obj.description);

export function isIUIElementTexts(obj: any): obj is IUIElementTexts {
  return implementsIUIElementTexts(obj);
}

export const UIElementTexts = `identifier
value
description
help
placeholder
`;
