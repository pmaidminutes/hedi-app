import { useRouter } from "next/router";
import { constructBreadCrumbPathData } from "../../server";
import {
  IAppStyled,
  IEntityLocalized,
  IEntityTranslated,
  IRouteLabeled,
} from "@/modules/model";

interface IBreadCrumbProps {
  content?: IEntityTranslated<IEntityLocalized> &
    Partial<IAppStyled> &
    Partial<IRouteLabeled>;
}

export const BreadCrumb: React.FunctionComponent<IBreadCrumbProps> = (
  props: IBreadCrumbProps
): JSX.Element => {
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
          {breadCrumbPath.map((crumb, index) =>
            crumb.currentPage ? (
              <div
                className="bx--breadcrumb-item bx--breadcrumb-item--current"
                key={crumb.label + index}>
                {crumb.label}
              </div>
            ) : (
              <div className="bx--breadcrumb-item" key={crumb.label + index}>
                {" "}
                <a href={crumb.route} className="bx--link">
                  {crumb.label}
                </a>
              </div>
            )
          )}
        </nav>
      </div>
    </div>
  );
};
