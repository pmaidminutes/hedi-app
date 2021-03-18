import { TryArticle } from "@/modules/editorial/article/client/components";
import { ArticlePathsGQL } from "@/modules/editorial/article/query";
import { getStaticProps as getArticleProps } from "@/modules/editorial/article/server";

import { TryPage } from "@/modules/editorial/page/client/components";
import { PagePathsGQL } from "@/modules/editorial/page/query";
import { getStaticProps as getPageProps } from "@/modules/editorial/page/server";

import { TryCategory } from "@/modules/editorial/category/client/components";
import { CategoryPathsGQL } from "@/modules/editorial/category/query";
import { getStaticProps as getCategoryProps } from "@/modules/editorial/category/server";

import { TryGlossary } from "@/modules/editorial/glossary/client/components";
import { GlossaryPathsGQL } from "@/modules/editorial/glossary/query";
import { getStaticProps as getGlossaryProps } from "@/modules/editorial/glossary/server";

import { TryProfile } from "@/modules/profile/client/components";
import {
  CaregiverPathsGQL,
  InstitutionPathsGQL,
  MidwifePathsGQL,
  OrganisationPathsGQL,
} from "@/modules/profile/query";
import { getStaticProps as getCaregiverProps } from "@/modules/profile/server/generators/getCaregiverStaticProps";
import { getStaticProps as getInstitutionProps } from "@/modules/profile/server/generators/getInstitutionStaticProps";
import { getStaticProps as getMidwifeProps } from "@/modules/profile/server/generators/getMidwifeStaticProps";
import { getStaticProps as getOrganisationProps } from "@/modules/profile/server/generators/getOrganisationStaticProps";

import { TrySearch } from "@/modules/search/client/components";
import { SearchViewPathsGQL } from "@/modules/search/query";
import { getStaticProps as getSearchViewProps } from "@/modules/search/server";

import { TryLogin } from "@/modules/login/client/components";
import { LoginViewPathsGQL } from "@/modules/login/query";
import { getStaticProps as getLoginViewProps } from "@/modules/login/server/generators";

import { TryEditProfile } from "@/modules/editProfile/components";
import { EditProfilePathsGQL } from "@/modules/editProfile/query";
import { getStaticProps as getEditProfileProps } from "@/modules/editProfile/server/generators";

// Components
import { Content } from "carbon-components-react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { BreadCrumb, Header } from "@/modules/shell/components";
// Types
import { ISegmentParam } from "@/modules/common/types";
import {
  IAppStyled,
  IEntityLocalized,
  IEntityTranslated,
} from "@/modules/model";
import { GetStaticPaths, GetStaticProps } from "next/types";
import { getSegmentsPaths } from "@/modules/common/query";

let dynamicProps: any;
const isDesignContext = process.env.HEDI_ENV !== undefined ? true : false;

const getDesignProps = async () => {
  const { existsSync } = await import("fs");
  const { join } = await import("path");
  if (existsSync(join(__dirname, "../design/imports")))
    return import("../design/imports").then(({ propsMap }) => propsMap);
  else return null;
};

export const getStaticPaths: GetStaticPaths<ISegmentParam> = async context => {
  if (isDesignContext) dynamicProps = await getDesignProps();

  const pathQueries = [
    PagePathsGQL,
    ArticlePathsGQL,
    CategoryPathsGQL,
    GlossaryPathsGQL,
    CaregiverPathsGQL,
    MidwifePathsGQL,
    OrganisationPathsGQL,
    InstitutionPathsGQL,
    SearchViewPathsGQL,
    LoginViewPathsGQL,
    EditProfilePathsGQL,
  ];
  const locales = context?.locales ?? [];
  const paths = [];
  for (const lang of locales) {
    paths.push(...(await getSegmentsPaths(pathQueries, lang)));
  }

  return { paths, fallback: "blocking" };
};

interface ISegmentPageProps {
  content: IEntityTranslated<IEntityLocalized> & Partial<IAppStyled>;
}

export const getStaticProps: GetStaticProps<
  ISegmentPageProps,
  ISegmentParam
> = async ({ params, locale }) => {
  const segments = params?.segments ?? [];
  let content;

  if (isDesignContext) {
    const data = dynamicProps?.find(
      (element: any) => element[0] === segments.join("/")
    );
    content = data?.[1]?.content;
  }

  // query types with dynamic paths first
  if (isDesignContext && content) {
    //we have a exported content for designing, skip backend fetches
  } else {
    console.log(params?.segments);
    if (!content) content = await getSearchViewProps(params?.segments, locale);
    if (!content) content = await getLoginViewProps(params?.segments, locale);
    if (!content) content = await getEditProfileProps(params?.segments, locale);
    if (!content) content = await getCategoryProps(params?.segments, locale);
    if (!content) content = await getArticleProps(params?.segments, locale);
    if (!content) content = await getGlossaryProps(params?.segments, locale);
    if (!content) content = await getCaregiverProps(params?.segments, locale);
    if (!content) content = await getMidwifeProps(params?.segments, locale);
    if (!content)
      content = await getOrganisationProps(params?.segments, locale);
    if (!content) content = await getInstitutionProps(params?.segments, locale);
    if (!content) content = await getPageProps(params?.segments, locale);
  }
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
        <TryLogin {...content} />
        <TryEditProfile {...content} />
        <TryPage {...content} />
      </Content>
    </div>
  );
}
