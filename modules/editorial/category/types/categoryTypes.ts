import { gql } from "@/modules/graphql";
import {
  IEntityTranslated,
  IEntityLocalized,
  EntityLocalizedFields,
  EntityTranslatedFields,
  IAppStyled,
  IRouteLabeled,
  RouteLabelFields,
} from "@/modules/model";
import {
  ArticleEntryGQL,
  IArticleEntry,
  IArticleTeaser,
} from "@/modules/editorial/article/types";
import { ImageGQL, IImage } from "@/modules/editorial/types";
import { IComponent } from "@/modules/components";

export interface ICategoryEntry extends IEntityLocalized {
  image?: IImage;
}

export const CategoryEntryGQL = gql`... on Category {
${EntityLocalizedFields}
image { ${ImageGQL} }
}`;

export interface ICategoryRoot extends IEntityTranslated<IEntityLocalized> {
  categories: ICategoryEntry[];
  articles: IArticleEntry[];
  components: IComponent[];
  recommendedArticles: IArticleTeaser[];
}

export const CategoryRootGQL = gql`... on CategoryRoot {
${EntityTranslatedFields}
categories { ${CategoryEntryGQL} }
}`;

export interface ICategory
  extends ICategoryEntry,
    ICategoryRoot,
    IAppStyled,
    IRouteLabeled {
  parent: number;
  articles: IArticleEntry[];
  appStyle: string;
}

export function isICategory(obj: any): obj is ICategory {
  return obj && obj.type === "Category";
}

export const CategoryGQL = gql`... on Category {
${EntityTranslatedFields}
${RouteLabelFields}
image { ${ImageGQL} }
parent
appStyle
categories { ${CategoryEntryGQL} }
articles { ${ArticleEntryGQL} }
}`;
