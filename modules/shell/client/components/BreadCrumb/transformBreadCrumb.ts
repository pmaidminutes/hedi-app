import { IEntity, ILocalized, IRouteLabeled } from "@/modules/model";
import { constructBreadCrumbPathData } from "../../../server";
export interface IBreadCrumbProps extends IRouteLabeled, ILocalized, IEntity {}

export function transformBreadCrumb(props: IBreadCrumbProps) {
  const { lang } = props;

  const breadCrumbPath = constructBreadCrumbPathData(props);
  // TODO only works for SSG
  const isCurrentPage = breadCrumbPath.length === 0;

  return {
    breadCrumbPath,
    isCurrentPage,
    lang,
  };
}
