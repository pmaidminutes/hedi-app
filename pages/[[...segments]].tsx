import Head from "next/head";
import { useState, useEffect } from "react";
// Types
import { GetStaticPaths, GetStaticProps } from "next/types";
import { ISegmentParam } from "@/modules/editorial/types";
import {
  IAppStyled,
  IEntityLocalized,
  IEntityTranslated,
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
  content: IEntityTranslated<IEntityLocalized> & Partial<IAppStyled>;
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
  const { appstyle } = content;
  const [hediStyle, setHediStyle] = useState("");

  useEffect(() => {
    setHediStyle(appstyle ?? "");
  }, [appstyle]);

  return (
    <div className={hediStyle}>
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
