import { IEntity } from "@/modules/model";
import { routeToSegments } from "@/modules/common/utils";
interface IBreadCrumbPath extends Omit<IEntity, "type"> {
  isCurrentPage: boolean;
}
import { IBreadCrumbProps } from "../client/components/BreadCrumb/transformBreadCrumb";

export function constructBreadCrumbPathData(
  props: IBreadCrumbProps
): IBreadCrumbPath[] {
  const composedPath: IBreadCrumbPath[] = [];

  if (props !== null) {
    const { route, routelabel, type, label, lang } = props;
    let basePath = "/" + lang;

    if (type === "Category" || type === "Article" || type === "Search") {
      let pathArray = routeToSegments(route);

      const names =
        routelabel !== undefined
          ? routelabel.split("/").filter(e => e !== "")
          : label;

      pathArray.forEach((path: string, index: number) => {
        basePath = basePath + "/" + path;
        composedPath.push({
          label: names[index],
          route: basePath,
          isCurrentPage:
            pathArray[pathArray.length - 1] === path ? true : false,
        });
      });
    }
  }
  return composedPath;
}
