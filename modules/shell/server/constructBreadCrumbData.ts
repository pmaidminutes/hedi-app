interface IBreadCrumbPath {
  name: string;
  url: string;
  currentPage: boolean;
}

import {
  IAppStyled,
  IEntityLocalized,
  IEntityTranslated,
  IRouteLabeled,
} from "@/modules/model";

export function constructBreadCrumbPathData(
  content:
    | (IEntityTranslated<IEntityLocalized> &
        Partial<IAppStyled> &
        Partial<IRouteLabeled>)
    | null,
  locale: string,
  defaultLocale: string | undefined
): IBreadCrumbPath[] {
  const composedPath: IBreadCrumbPath[] = [];

  if (content !== null) {
    const { route, routelabel, type, label } = content;
    let basePath = locale === defaultLocale ? "" : "/" + locale;

    if (type === "Category" || type === "Article") {
      const pathArray = filterEmptyElements(route.split("/"));

      const names =
        routelabel !== undefined
          ? filterEmptyElements(routelabel.split("/"))
          : label;

      pathArray.forEach((path: string, index: number) => {
        basePath = basePath + "/" + path;
        composedPath.push({
          name: names[index],
          url: basePath,
          currentPage: route.endsWith(path) ? true : false,
        });
      });
    }
  }
  return composedPath;
}

function filterEmptyElements(array: string[]): string[] {
  return array.filter((el: string) => el.trim() !== "");
}
