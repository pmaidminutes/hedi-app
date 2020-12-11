import Head from "next/head";
import { useRouter } from "next/router";
// Types
import { GetStaticPaths, GetStaticProps } from "next/types";
import { ISegmentParam, ISegmentProps } from "@/common/types";
// generators
import {
  getStaticPaths as getArticlePaths,
  getStaticProps as getArticleProps,
} from "@/modules/editorial/generators/article";
import {
  getStaticPaths as getCategoryPaths,
  getStaticProps as getCategoryProps,
} from "@/modules/editorial/generators/category";
import {
  getStaticPaths as getGlossaryPaths,
  getStaticProps as getGlossaryProps,
} from "@/modules/editorial/generators/glossary";
// Components
import { Content } from "carbon-components-react";
import {
  BreadCrumb,
  HediHeader,
  TryArticle,
  TryCategory,
  TryGlossary,
} from "@/common/components";

export const getStaticPaths: GetStaticPaths = async context => {
  const locales = context?.locales ?? [];
  const paths = [];
  paths.push(...(await getArticlePaths(locales)));
  paths.push(...(await getCategoryPaths(locales)));
  paths.push(...(await getGlossaryPaths(locales)));
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
  if (!content) content = await getGlossaryProps(params?.segments, locale);

  if (!content) {
    console.log("couldn't find content for path ", segments.join("/"));
    throw Error("Houston, we have got a problem");
  }

  return { props: { content } };
};

export default function segments(props: ISegmentProps) {
  let { content } = props;
  const router = useRouter();
  const {
    query: { segments },
  } = router;
  const pageTitle =
    segments && segments.length > 0 ? segments[segments.length - 1] : "";
  // TODO get proper page title, probably entity label
  return (
    <>
      <Head>
        <title>HEDI App</title>
      </Head>
      <HediHeader pageTitle={pageTitle} translations={content.translations} />
      <BreadCrumb />

      {/* <Content> */}
      <main>
        <TryCategory {...content} />
        <TryArticle {...content} />
        <TryGlossary {...content} />
        {/* </Content> */}
      </main>
    </>
  );
}
