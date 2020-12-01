import Head from "next/head";
import { LanguageSwitch } from "../common/components";
import { GetStaticProps } from "next";

import {
  Content,
  SideNav,
  ListItem,
  AspectRatio,
  Tab,
  Grid,
  Row,
  Column,
} from "carbon-components-react";
import { IGlossaryEntry } from "@/modules/editorial/types";
import { getAllGlossaries } from "@/modules/editorial/glossaries";

export const getStaticProps: GetStaticProps<any> = async ({
  locale,
  locales,
}) => {
  const glossaries = await getAllGlossaries(`${locale}`);

  return { props: { locales, locale, glossaries } };
};

interface IGlossaryProps {
  locales: string[];
  locale: string;
  glossaries: IGlossaryEntry[];
}

export default function glossary({ glossaries }: IGlossaryProps) {
  return (
    <div>
      <Head>
        <title>HEDI App index</title>
      </Head>
      <SideNav
        aria-label="Side Navigation"
        isFixedNav
        expanded={true}
        isChildOfHeader={false}>
        <ListItem>
          <LanguageSwitch />
        </ListItem>
      </SideNav>
      <Content>
        <Grid>
          <Row>
            {glossaries.map(glossaryEntry => (
              <Column lg={3} style={{}}>
                <AspectRatio ratio="1x1" background-color="red">
                  {glossaryEntry.label}
                  {glossaryEntry.body.substring(0, 300)}
                </AspectRatio>
              </Column>
            ))}
          </Row>
        </Grid>
      </Content>
      {JSON.stringify(glossaries)}
    </div>
  );
}
