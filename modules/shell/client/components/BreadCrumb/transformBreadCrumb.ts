import {
  IAppStyled,
  IEntityLocalized,
  IEntityTranslated,
  IRouteLabeled,
} from "@/modules/model";
import { constructBreadCrumbPathData } from "../../../server";
export interface IBreadCrumbProps {
  content?: IEntityTranslated<IEntityLocalized> &
    Partial<IAppStyled> &
    Partial<IRouteLabeled>;
}

export function transformBreadCrumb(props: IBreadCrumbProps) {
  const content = props.content ?? null;
  const lang = content?.lang ?? "de";
  const breadCrumbPath = constructBreadCrumbPathData(content, lang ?? "de");
  // TODO only works for SSG
  const isCurrentPage = breadCrumbPath.length === 0;

  return {
    breadCrumbPath,
    isCurrentPage,
    lang,
  };
}
