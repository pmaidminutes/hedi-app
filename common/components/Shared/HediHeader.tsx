import { LanguageSwitch } from "@/common/components";
import { Column, Header, HeaderName, Row } from "carbon-components-react";
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
    <Header className="hedi-header" aria-label="Hedi">
      <Row>
        <Column>
          <HeaderName href="/" prefix="HEDI">
            {props.pageTitle}
          </HeaderName>
        </Column>
        <Column>
          <LanguageSwitch />
        </Column>
        <Column>
          <SearchInput inputText={() => console.log("search")} />
          {/*         <Search20 id="se-id" onClick={()=> router.push({pathname: "/search", query:{searchTexts: "searchValue"}},"/search") }/>
           */}{" "}
        </Column>
      </Row>
    </Header>
  );
};
