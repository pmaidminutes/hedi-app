import { IEntity } from "@/modules/model";
interface IBreadCrumbPath extends Omit<IEntity, "type"> {
  isCurrentPage: boolean;
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
    console.log({ routelabel });

    if (type === "Category" || type === "Article") {
      let pathArray = route.split("/").filter(e => e !== "");
      pathArray.shift();

      const names =
        routelabel !== undefined
          ? routelabel.split("/").filter(e => e !== "")
          : label;

      console.log({ names });

      pathArray.forEach((path: string, index: number) => {
        console.log({ path }, names[index]);
        composedPath.push({
          label: names[index],
          route: path,
          isCurrentPage:
            pathArray[pathArray.length - 1] === path ? true : false,
        });
      });
    }
  }
  return composedPath;
}
