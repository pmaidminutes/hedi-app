import { GlossaryGroup } from "@/common/components/Glossary";
import {
  getStaticPaths as getAllGlossaryPaths,
  getStaticProps as regroupGlossary,
  IGlossaryPaths,
} from "@/modules/editorial/generators/glossary";
import { getGlossaries } from "@/modules/editorial/glossaries";
import { IGroupGlossary } from "@/modules/editorial/types";
import { Column, Content, Grid, Row } from "carbon-components-react";
import Head from "next/head";
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
  const groupedGlossaries = await regroupGlossary(
    await getGlossaries(`${locale}`)
  );

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
  const {
    query: { glossaryLocalized: pageTitle, glossaryTerm: glossaryUrlTerm },
  } = useRouter();
  return (
    <div>
      <Head>
        <title>HEDI App index</title>
      </Head>
      <Content>
        {
          //TODO need to discuss if there is a need for localized pageTitle
        }
        <h1 style={{ fontStyle: "bold" }}>{pageTitle}</h1>
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
