import { GetStaticProps } from "next";
import { useRouter } from "next/router";
// TODO refactor when changing BreadCrumb
export const getStaticProps: GetStaticProps<any> = async ({
  locale,
  locales,
}) => {
  return { props: { locales, locale } };
};
interface CrumbPath {
  name: string;
  url: string;
  currentPage: boolean;
}
export interface BreadCrumbProps {
  staticCrumb?: CrumbPath[];
}
export const BreadCrumb: React.FunctionComponent<BreadCrumbProps> = (
  props: BreadCrumbProps
) => {
  const router = useRouter();

  const breadCrumbPath =
    props.staticCrumb ?? constructUrl(router.asPath, router.locale ?? "de");
  return (
    <div className="bx--grid">
      <div
        className="by--row bx--row-padding bx--breadcrumb--no-trailing-slash my-s-sm pl-s-sm"
        aria-label="breadcrumb">
        <nav
          className="bx--breadcrumb bx--breadcrumb--no-trailing-slash"
          aria-label="breadcrumb">
          <div className="bx--breadcrumb-item">
            <a href="/" className="bx--link">
              Home
            </a>
          </div>
          {breadCrumbPath.map((crumb, index) =>
            crumb.currentPage ? (
              <div
                className="bx--breadcrumb-item bx--breadcrumb-item--current"
                key={index}>
                {crumb.name}
              </div>
            ) : (
              <div className="bx--breadcrumb-item" key={index}>
                {" "}
                <a href={crumb.url} className="bx--link">
                  {crumb.name}
                </a>
              </div>
            )
          )}
        </nav>
      </div>
    </div>
  );
};
function constructUrl(asPath: string, locale: string): CrumbPath[] {
  const pathArray = asPath.split("/");
  const composedPath: CrumbPath[] = [];
  let basePath = "/" + locale;
  pathArray.map((path: string) => {
    if (path.trim() != "") {
      basePath = basePath + "/" + path;
      composedPath.push({
        name: path.split("#")[0],
        url: basePath,
        currentPage: asPath.endsWith(path) ? true : false,
      });
    }
  });

  return composedPath;
}
