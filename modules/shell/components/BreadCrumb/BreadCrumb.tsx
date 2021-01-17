import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { constructBreadCrumbData } from "../../server";
import {
  IAppStyled,
  IEntityLocalized,
  IEntityTranslated,
  IRouteLabeled,
} from "@/modules/model";
// TODO refactor when changing BreadCrumb
// export const getStaticProps: GetStaticProps<any> = async ({
//   locale,
//   locales,
// }) => {
//   return { props: { locales, locale } };
// };

interface CrumbPath {
  name: string;
  url: string;
  currentPage: boolean;
}
export interface BreadCrumbProps {
  content: IEntityTranslated<IEntityLocalized> &
    Partial<IAppStyled> &
    Partial<IRouteLabeled>;
}
export const BreadCrumb: React.FunctionComponent<BreadCrumbProps> = (
  props: BreadCrumbProps
) => {
  const router = useRouter();
  console.log({ router });
  const { asPath, locale, defaultLocale } = router;
  const { content } = props;

  console.log({ content });

  // const breadCrumbPath =
  //   pageType === "dynamic"
  //     ? constructBreadCrumbData(
  //         asPath,
  //         locale ?? "de",
  //         routelabel ?? "",
  //         defaultLocale
  //       )
  //     : [asPath];
  // console.log({ breadCrumbPath })
  return <></>;
  // return (
  //   <div className="bx--grid">
  //     <div
  //       className="by--row bx--row-padding bx--breadcrumb--no-trailing-slash my-s-sm pl-s-sm"
  //       aria-label="breadcrumb">
  //       <nav
  //         className="bx--breadcrumb bx--breadcrumb--no-trailing-slash"
  //         aria-label="breadcrumb">
  //         <div className="bx--breadcrumb-item">
  //           <a href="/" className="bx--link">
  //             Home
  //           </a>
  //         </div>
  //         {breadCrumbPath.map((crumb, index) =>
  //           crumb.currentPage ? (
  //             <div
  //               className="bx--breadcrumb-item bx--breadcrumb-item--current"
  //               key={index}>
  //               {crumb.name}
  //             </div>
  //           ) : (
  //             <div className="bx--breadcrumb-item" key={index}>
  //               {" "}
  //               <a href={crumb.url} className="bx--link">
  //                 {crumb.name}
  //               </a>
  //             </div>
  //           )
  //         )}
  //       </nav>
  //     </div>
  //   </div>
  // );
};
