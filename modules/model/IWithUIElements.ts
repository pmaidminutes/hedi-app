import { IUIElementTexts, UIElementTexts } from "./IUIElementTexts";

export interface IWithUIElements {
  elements: IUIElementTexts[];
}

export const implementsIWithUIElements = (obj: any) => !!(obj && obj.elements);

export function isIWithUIElements(obj: any): obj is IWithUIElements {
  return implementsIWithUIElements(obj);
}

export const WithUIElementsFields = `elements { 
  ${UIElementTexts}
}`;
