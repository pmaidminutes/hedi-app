import { useRouter } from "next/router";
import { constructBreadCrumbPathData } from "../../server";
import {
  IAppStyled,
  IEntityLocalized,
  IEntityTranslated,
  IRouteLabeled,
} from "@/modules/model";

interface BreadCrumbProps {
  content?: IEntityTranslated<IEntityLocalized> &
    Partial<IAppStyled> &
    Partial<IRouteLabeled>;
}
export const BreadCrumb: React.FunctionComponent<BreadCrumbProps> = (
  props: BreadCrumbProps
) => {
  const router = useRouter();
  const { locale, defaultLocale } = router;
  const content = props.content ?? null;

  const breadCrumbPath = constructBreadCrumbPathData(
    content,
    locale ?? "de",
    defaultLocale
  );
  return (
    <div className="bx--grid">
      <div
        className="by--row bx--row-padding bx--breadcrumb--no-trailing-slash my-s-sm pl-s-sm"
        aria-label="breadcrumb">
        <nav
          className="bx--breadcrumb bx--breadcrumb--no-trailing-slash"
          aria-label="breadcrumb">
          {breadCrumbPath.length > 0 ? (
            <div className="bx--breadcrumb-item">
              <a
                href={`/${locale === defaultLocale ? "" : locale}`}
                className="bx--link">
                Home
              </a>
            </div>
          ) : (
            <div
              className={`bx--breadcrumb-item${
                breadCrumbPath.length === 0
                  ? " bx--breadcrumb-item--current"
                  : ""
              }`}>
              Home
            </div>
          )}
          {breadCrumbPath.length > 0
            ? breadCrumbPath.map((crumb, index) =>
                crumb.currentPage ? (
                  <div
                    className="bx--breadcrumb-item bx--breadcrumb-item--current"
                    key={crumb.name + index}>
                    {crumb.name}
                  </div>
                ) : (
                  <div className="bx--breadcrumb-item" key={crumb.name + index}>
                    {" "}
                    <a href={crumb.url} className="bx--link">
                      {crumb.name}
                    </a>
                  </div>
                )
              )
            : null}
        </nav>
      </div>
    </div>
  );
};
