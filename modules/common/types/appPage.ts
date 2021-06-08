import { gql } from "@/modules/graphql";
import { IImage, ImageGQL } from "@/modules/editorial/types";
import {
  EntityTranslatedFields,
  IEntityLocalized,
  IEntityTranslated,
  IRouteLabeled,
  RouteLabelFields,
} from "@/modules/model";
import { IWithKey, WithKeyFields } from "@/modules/model/IWithKey";

export interface IAppPage
  extends IEntityTranslated<IEntityLocalized>,
    IWithKey {
  routelabel: IRouteLabeled;
  longTitle?: string;
  posterImage: IImage;
}

export function isIAppPage(obj: any): obj is IAppPage {
  return obj && obj?.type === "AppPage" && obj?.key;
}

export const AppPageGQL = gql`... on AppPage {
${EntityTranslatedFields}
${RouteLabelFields}
${WithKeyFields}
longTitle
posterImage {${ImageGQL}}
}`;
