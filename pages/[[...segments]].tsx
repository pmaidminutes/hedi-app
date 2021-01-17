import Head from "next/head";
// Types
import { GetStaticPaths, GetStaticProps } from "next/types";
import { ISegmentParam } from "@/modules/editorial/types";
import {
  IAppStyled,
  IEntityLocalized,
  IEntityTranslated,
  IRouteLabeled,
} from "@/modules/model";
// generators
import {
  getStaticPaths as getCategoryPaths,
  getStaticProps as getCategoryProps,
} from "@/modules/editorial/category/server";
import {
  getStaticPaths as getArticlePaths,
  getStaticProps as getArticleProps,
} from "@/modules/editorial/article/server";
import {
  getStaticPaths as getGlossaryPaths,
  getStaticProps as getGlossaryProps,
} from "@/modules/editorial/glossary/server";
// Components
import { BreadCrumb, Header } from "@/modules/shell/components";
import { TryGlossary } from "@/modules/editorial/glossary/client/components";
import { TryCategory } from "@/modules/editorial/category/client/components";
import { TryArticle } from "@/modules/editorial/article/client/components";

export const getStaticPaths: GetStaticPaths<ISegmentParam> = async context => {
  const locales = context?.locales ?? [];
  const paths = [];
  paths.push(...(await getArticlePaths(locales)));
  paths.push(...(await getCategoryPaths(locales)));
  paths.push(...(await getGlossaryPaths(locales)));
  return { paths, fallback: false };
};

export interface ISegmentPageProps {
  content: IEntityTranslated<IEntityLocalized> &
    Partial<IAppStyled> &
    Partial<IRouteLabeled>;
}

export const getStaticProps: GetStaticProps<
  ISegmentPageProps,
  ISegmentParam
> = async ({ params, locale }) => {
  const segments = params?.segments ?? [];

  let content;
  content = await getCategoryProps(params?.segments, locale);
  if (!content) content = await getArticleProps(params?.segments, locale);
  if (!content) content = await getGlossaryProps(params?.segments, locale);

  if (!content) {
    console.log("couldn't find content for path ", segments.join("/"));
    throw Error("Houston, we have got a problem");
  }

  return { props: { content } };
};

export default function segments(props: ISegmentPageProps) {
  const { content } = props;
  console.log({ content });
  const { type } = content;
  console.log({ content });
  const pageType = type === "Glossary" ? "static" : "dynamic";
  const routelabel = type === "Glossary" ? type : content.routelabel;
  return (
    <div className={content.appstyle ?? ""}>
      <Head>
        <title>HEDI App</title>
      </Head>
      <Header {...content} />
      <BreadCrumb content={content} />
      <main>
        <TryCategory {...content} />
        <TryArticle {...content} />
        <TryGlossary {...content} />
      </main>
    </div>
  );
}
