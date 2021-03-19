import { IImage, ImageFields } from "@/modules/editorial/types";
import {
  IEntityLocalized,
  IEntityTranslated,
  EntityTranslatedFields,
  IRouteLabeled,
  RouteLabelFields,
  IWithUIElements,
  WithUIElementsFields,
  IBody,
  BodyFields,
} from "@/modules/model";

export interface IAppPage
  extends IEntityTranslated<IEntityLocalized>,
    IWithUIElements,
    IBody {
  routelabel: IRouteLabeled;
  key: string;
  longTitle?: string;
  posterImage?: IImage;
}

export function isIAppPage(obj: any): obj is IAppPage {
  return obj && obj.typeName === "AppPage" && obj.key;
}

export const AppPageFields = `${EntityTranslatedFields}
${RouteLabelFields}
key
longTitle
${WithUIElementsFields}
${BodyFields}
posterImage {${ImageFields}}
`;
