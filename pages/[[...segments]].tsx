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
import { getStaticProps as getCaregiverProps } from "@/modules/profile/server/generators/getCaregiverStaticProps";
import { getStaticPaths as getCaregiverPaths } from "@/modules/profile/server/generators/getStaticCaregiverPaths";
import { getStaticProps as getMidwifeProps } from "@/modules/profile/server/generators/getMidwifeStaticProps";
import { getStaticPaths as getMidwifePaths } from "@/modules/profile/server/generators/getStaticMidwifePaths";
import {
  getStaticPaths as getSearchViewPaths,
  getStaticProps as getSearchViewProps,
} from "@/modules/search/server";
// Components
import { BreadCrumb, Header } from "@/modules/shell/components";
import { TryGlossary } from "@/modules/editorial/glossary/client/components";
import { TryCategory } from "@/modules/editorial/category/client/components";
import { TryArticle } from "@/modules/editorial/article/client/components";
import { TryProfile } from "@/modules/profile/client/components";
import { TrySearch } from "@/modules/search/client/components";

export const getStaticPaths: GetStaticPaths<ISegmentParam> = async context => {
  const locales = context?.locales ?? [];
  const paths = [];
  paths.push(...(await getArticlePaths(locales)));
  paths.push(...(await getCategoryPaths(locales)));
  paths.push(...(await getGlossaryPaths(locales)));
  paths.push(...(await getCaregiverPaths(locales)));
  paths.push(...(await getMidwifePaths(locales)));
  paths.push(...(await getSearchViewPaths(locales)));
  return { paths, fallback: "blocking" };
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
  // query types with dynamic paths first
  if (!content) content = await getSearchViewProps(params?.segments, locale);
  if (!content) content = await getCategoryProps(params?.segments, locale);
  if (!content) content = await getArticleProps(params?.segments, locale);
  if (!content) content = await getGlossaryProps(params?.segments, locale);
  if (!content) content = await getCaregiverProps(params?.segments, locale);
  if (!content) content = await getMidwifeProps(params?.segments, locale);

  if (!content) {
    console.log("couldn't find content for path ", segments.join("/"));
    throw Error("Houston, we have got a problem");
  }

  return {
    props: { content },
    revalidate: content.type === "Search" ? 15 : false,
  };
};

export default function segments(props: ISegmentPageProps) {
  const { content } = props;
  const [hediStyle, setHediStyle] = useState("");

  useEffect(() => {
    setHediStyle(content?.appstyle ?? "");
  }, [content]);

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
        <TryProfile {...content} />
        <TrySearch {...content} />
      </main>
    </div>
  );
}
