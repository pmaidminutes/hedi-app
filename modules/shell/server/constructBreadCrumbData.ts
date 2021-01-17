interface BreadCrumbProps {
  name: string;
  url: string;
  currentPage: boolean;
}

export function constructBreadCrumbData(
  asPath: string,
  locale: string,
  routelabel: string,
  defaultLocale: string | undefined
): BreadCrumbProps[] {
  const composedPath: BreadCrumbProps[] = [];
  let basePath = locale === defaultLocale ? "" : "/" + locale;

  const pathArray = filterEmptyElements(asPath.split("/"));
  const names = filterEmptyElements(routelabel.split("/"));

  pathArray.forEach((path: string, index: number) => {
    basePath = basePath + "/" + path;
    composedPath.push({
      name: names[index],
      url: basePath,
      currentPage: asPath.endsWith(path) ? true : false,
    });
  });

  function filterEmptyElements(array: string[]): string[] {
    return array.filter((el: string) => el.trim() !== "");
  }

  return composedPath;
}
