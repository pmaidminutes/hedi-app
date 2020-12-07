import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next/types";

import { Content, Grid, Row, Column } from "carbon-components-react";
import { IGroupGlossary, IGlossaryPaths } from "@/modules/editorial/types";
import { getGlossaries } from "@/modules/editorial/glossaries";
import { regroupGlossary } from "@/modules/editorial/helper";
import { getAllGlossaryPaths } from "@/modules/editorial/generators/glossary";
import { useRouter } from "next/router";
import { GlossaryGroup } from "@/common/components/Glossary";

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  let paths: IGlossaryPaths[] = await getAllGlossaryPaths(locales ?? []);
  return { paths, fallback: false };
};
export const getStaticProps: GetStaticProps<any> = async ({
  locale,
  defaultLocale,
}) => {
  const groupedGlossaries = regroupGlossary(await getGlossaries(`${locale}`));

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
            {groupedGlossaries.map((glossaryGroup: IGroupGlossary) => (
              <Column lg={5}>
                <GlossaryGroup
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
