import { TryArticle } from "@/modules/editorial/article/client/components";
import {
  getStaticPaths as getArticlePaths,
  getStaticProps as getArticleProps,
} from "@/modules/editorial/article/server";
import { TryPage } from "@/modules/editorial/page/client/components";
import {
  getStaticPaths as getPagePaths,
  getStaticProps as getPageProps,
} from "@/modules/editorial/page/server";
import { TryCategory } from "@/modules/editorial/category/client/components";
// generators
import {
  getStaticPaths as getCategoryPaths,
  getStaticProps as getCategoryProps,
} from "@/modules/editorial/category/server";
import { TryGlossary } from "@/modules/editorial/glossary/client/components";
import {
  getStaticPaths as getGlossaryPaths,
  getStaticProps as getGlossaryProps,
} from "@/modules/editorial/glossary/server";
import { ISegmentParam } from "@/modules/editorial/types";
import {
  IAppStyled,
  IEntityLocalized,
  IEntityTranslated,
} from "@/modules/model";
import { TryProfile } from "@/modules/profile/client/components";
import { getStaticProps as getCaregiverProps } from "@/modules/profile/server/generators/getCaregiverStaticProps";
import { getStaticProps as getInstitutionProps } from "@/modules/profile/server/generators/getInstitutionStaticProps";
import { getStaticProps as getMidwifeProps } from "@/modules/profile/server/generators/getMidwifeStaticProps";
import { getStaticProps as getOrganisationProps } from "@/modules/profile/server/generators/getOrganisationStaticProps";
import { getStaticPaths as getCaregiverPaths } from "@/modules/profile/server/generators/getStaticCaregiverPaths";
import { getStaticPaths as getInstitutionPaths } from "@/modules/profile/server/generators/getStaticInstitutionPaths";
import { getStaticPaths as getMidwifePaths } from "@/modules/profile/server/generators/getStaticMidwifePaths";
import { getStaticPaths as getOrganisationPaths } from "@/modules/profile/server/generators/getStaticOrganisationPaths";
import { TrySearch } from "@/modules/search/client/components";
import {
  getStaticPaths as getSearchViewPaths,
  getStaticProps as getSearchViewProps,
} from "@/modules/search/server";
// Components
import { BreadCrumb, Header } from "@/modules/shell/components";
import Head from "next/head";
// Types
import { GetStaticPaths, GetStaticProps } from "next/types";
import { useEffect, useState } from "react";
import { Content } from "carbon-components-react";

export const getStaticPaths: GetStaticPaths<ISegmentParam> = async context => {
  const locales = context?.locales ?? [];
  const paths = [];
  paths.push(...(await getArticlePaths(locales)));
  paths.push(...(await getCategoryPaths(locales)));
  paths.push(...(await getGlossaryPaths(locales)));
  paths.push(...(await getCaregiverPaths(locales)));
  paths.push(...(await getMidwifePaths(locales)));
  paths.push(...(await getOrganisationPaths(locales)));
  paths.push(...(await getInstitutionPaths(locales)));
  paths.push(...(await getSearchViewPaths(locales)));
  paths.push(...(await getPagePaths(locales)));
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
  if (!content) content = await getOrganisationProps(params?.segments, locale);
  if (!content) content = await getInstitutionProps(params?.segments, locale);
  if (!content) content = await getPageProps(params?.segments, locale);

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
      <Content>
        <BreadCrumb content={content} />
        <TryCategory {...content} />
        <TryArticle {...content} />
        <TryGlossary {...content} />
        <TryProfile {...content} />
        <TrySearch {...content} />
        <TryPage {...content} />
      </Content>
    </div>
  );
}
