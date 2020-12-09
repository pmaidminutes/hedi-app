import { Breadcrumb, BreadcrumbItem } from "carbon-components-react";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps<any> = async ({
  locale,
  locales,
}) => {
  return { props: { locales, locale } };
};
export interface HeaderProps {
  pageTitle: string;
  path: string;
}
export const BreadCrumb: React.FunctionComponent<HeaderProps> = (
  props: HeaderProps
) => {
  return (
    <>
      <Breadcrumb noTrailingSlash>
        <BreadcrumbItem>
          <a href="/">{"HEDI"}</a>
        </BreadcrumbItem>
        <BreadcrumbItem href={props.path} isCurrentPage>
          {props.pageTitle}
        </BreadcrumbItem>
      </Breadcrumb>
    </>
  );
};
