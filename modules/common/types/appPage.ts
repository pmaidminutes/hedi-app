import { IImage, ImageFields } from "@/modules/editorial/types";
import {
  BodyFields,
  EntityTranslatedFields,
  IBody,
  IEntityLocalized,
  IEntityTranslated,
  IRouteLabeled,
  IWithUIElements,
  RouteLabelFields,
  WithUIElementsFields,
} from "@/modules/model";
import { IWithKey, WithKeyFields } from "@/modules/model/IWithKey";

export interface IAppPage
  extends IEntityTranslated<IEntityLocalized>,
    IWithUIElements,
    IBody,
    IWithKey {
  routelabel: IRouteLabeled;
  longTitle?: string;
  posterImage: IImage;
}

// UNUSED
export function isIAppPage(obj: any): obj is IAppPage {
  return obj && obj.typeName === "AppPage" && obj.key;
}

export const AppPageFields = `${EntityTranslatedFields}
${RouteLabelFields}
${WithKeyFields}
longTitle
${WithUIElementsFields}
${BodyFields}
posterImage {${ImageFields}}
`;
