import Head from "next/head";
// Types
import { GetStaticPaths, GetStaticProps } from "next/types";
import {
  getStaticPaths as getArticlePaths,
  getStaticProps as getArticleProps,
} from "@/modules/editorial/generators/article";
import {
  getStaticPaths as getCategoryPaths,
  getStaticProps as getCategoryProps,
} from "@/modules/editorial/generators/category";
// Components
import { Content, SideNav, ListItem } from "carbon-components-react";
import { LanguageSwitch, TryArticle, TryCategory } from "@/common/components";
import { ISegmentParam, ISegmentProps } from "@/common/types";

export const getStaticPaths: GetStaticPaths = async context => {
  const locales = context?.locales ?? [];
  const paths = [];
  paths.push(...(await getArticlePaths(locales)));
  paths.push(...(await getCategoryPaths(locales)));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<
  ISegmentProps,
  ISegmentParam
> = async ({ params, locale, locales }) => {
  const segments = params?.segments ?? [];

  let content;
  content = await getCategoryProps(params?.segments, locale, locales);
  if (!content) content = await getArticleProps(params?.segments, locale);

  if (!content) {
    console.log("couldn't find content for path ", segments.join("/"));
    throw Error("Houston, we have got a problem");
  }

  return { props: { content } };
};

export default function segments(props: ISegmentProps) {
  let { content } = props;
  return (
    <>
      <Head>
        <title>HEDI App</title>
      </Head>
      <SideNav
        isFixedNav
        expanded={true}
        isChildOfHeader={false}
        aria-label="Side Navigation">
        <ListItem>
          <LanguageSwitch translations={content.translations} />
        </ListItem>
      </SideNav>
      <Content>
        <TryCategory {...content} />
        <TryArticle {...content} />
      </Content>
    </>
  );
}
