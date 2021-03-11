import {
  IEntityLocalized,
  IEntityTranslated,
  EntityTranslatedFields,
  IRouteLabeled,
  RouteLabelFields,
  IWithUIElements,
  WithUIElementsFields,
} from "@/modules/model";

export interface IAppPage
  extends IEntityTranslated<IEntityLocalized>,
    IWithUIElements {
  routelabel: IRouteLabeled;
  key: string;
}

export function isIAppPage(obj: any): obj is IAppPage {
  return obj && obj.typeName === "AppPage" && obj.key;
}

export const AppPageFields = `${EntityTranslatedFields}
${RouteLabelFields}
key
${WithUIElementsFields}
`;
