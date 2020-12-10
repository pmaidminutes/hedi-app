import { LanguageSwitch } from "@/common/components";
import { Search20 } from "@carbon/icons-react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { SearchInput } from "../Search";
export const getStaticProps: GetStaticProps<any> = async ({
  locale,
  locales,
}) => {
  return { props: { locales, locale } };
};
export interface HeaderProps {
  pageTitle: string;
}
export const HediHeader: React.FunctionComponent<HeaderProps> = (
  props: HeaderProps
) => {
  const router = useRouter();
  return (
    <header className="hedi-header">
      <div className="bx--grid">
        <div className="bx--row">
          <div className="bx--col pb-s-sm">
            <h1>{props.pageTitle}</h1>
            <p>look up interesting words</p>
          </div>
          <div
            className="bx--col-sm-4 bx--col-md-2 bx--col-lg-4 py-s-xs"
            style={{ alignSelf: "center" }}>
            <LanguageSwitch />
          </div>
          <div
            className="bx--col bx--col-sm-4 bx--col-md-3 bx--col-lg-4 py-s-xs"
            style={{ alignSelf: "center" }}>
            <SearchInput inputText={() => console.log("search")} />
          </div>
          <Search20
            style={{ position: "relative", alignSelf: "center" }}
            id="se-id"
            onClick={() =>
              router.push(
                { pathname: "/search", query: { searchTexts: "searchValue" } },
                "/search"
              )
            }
          />
        </div>
      </div>
    </header>
  );
};
