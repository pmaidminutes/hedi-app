import { GlossaryGroup } from "@/common/components/Glossary";
import { BreadCrumb, HediHeader } from "@/common/components/Shared";
import {
  getStaticPaths as getAllGlossaryPaths,
  getStaticProps as getGlossaries,
  IGlossaryPaths,
} from "@/modules/editorial/generators/glossary";
import { IGroupGlossary } from "@/modules/editorial/types";
import { Column, Content, Grid, Row } from "carbon-components-react";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next/types";

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  let paths: IGlossaryPaths[] = await getAllGlossaryPaths(locales ?? []);
  return { paths, fallback: false };
};
export const getStaticProps: GetStaticProps<any> = async ({
  locale,
  defaultLocale,
}) => {
  const groupedGlossaries = await getGlossaries(`${locale}`);
  return { props: { defaultLocale, groupedGlossaries } };
};
interface IGlossaryProps {
  defaultLocale: string;
  groupedGlossaries: IGroupGlossary[];
}
export default function glossary({
  defaultLocale,
  groupedGlossaries,
}: IGlossaryProps) {
  const router = useRouter();
  const {
    query: { glossaryLocalized },
  } = router;
  const pageTitle = `${glossaryLocalized}`;
  //TODO to include hash value to anchor on page load
  const glossaryUrlTerm = "xxxxx";
  //console.log(useRouter(),"---", pageTitle, "term and title")
  return (
    <div>
      <HediHeader pageTitle={pageTitle} />

      <Content>
        <BreadCrumb pageTitle={pageTitle} path={router.asPath} />
        {
          //TODO need to discuss if there is a need for localized pageTitle
        }

        <Grid>
          <Row>
            {groupedGlossaries.map((glossaryGroup: IGroupGlossary, index) => (
              <Column lg={5} key={index}>
                <GlossaryGroup
                  key={index}
                  glossaryGroup={glossaryGroup}
                  glossaryUrlTerm={`${glossaryUrlTerm}`}
                  defaultLocale={defaultLocale}
                />
              </Column>
            ))}
          </Row>
        </Grid>
      </Content>
    </div>
  );
}
