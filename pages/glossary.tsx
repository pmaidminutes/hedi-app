import Head from "next/head";
import { LanguageSwitch } from "../common/components";
import { GetStaticProps } from "next";

import {
  Content,
  SideNav,
  ListItem,
  AspectRatio,
  Accordion,
  AccordionItem,
  Grid,
  Row,
  Column,
} from "carbon-components-react";
import { IGlossary, IGlossaryEntry } from "@/modules/editorial/types";
import { getAllGlossaries } from "@/modules/editorial/glossaries";
import { reorderGlossaryView } from "@/modules/editorial/helper/regroupGlossary";

export const getStaticProps: GetStaticProps<any> = async ({
  locale,
  locales,
}) => {
  const groupedGlossaries = reorderGlossaryView(
    await getAllGlossaries(`${locale}`)
  );
  return { props: { locales, locale, groupedGlossaries } };
};
interface IGlossaryProps {
  locales: string[];
  locale: string;
  groupedGlossaries: IGlossary[];
}
export default function glossary({ groupedGlossaries }: IGlossaryProps) {
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
        <h1>{"Glossary"}</h1>
        <Grid>
          <Row>
            {groupedGlossaries.map((glossaryGroup: IGlossary) => (
              <Column lg={4}>
                <AspectRatio ratio="1x1" background-color="red">
                  {glossaryGroup.abbrev}
                  <Accordion>
                    {glossaryGroup.glossaries.map(
                      (glossaryEntry: IGlossaryEntry) => (
                        <AccordionItem title={glossaryEntry.label}>
                          <p>{glossaryEntry.body.substring(0, 300)}</p>
                        </AccordionItem>
                      )
                    )}
                  </Accordion>
                </AspectRatio>
              </Column>
            ))}
          </Row>
        </Grid>
      </Content>
    </div>
  );
}
