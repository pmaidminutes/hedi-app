import { getSegmentsPaths } from "@/modules/common/query";
// Types
import { IAppPage, ISegmentParam } from "@/modules/common/types";
import { getStaticProps as getLandingPageViewProps } from "@/modules/landingPage/server/generators";
import { TryLogin } from "@/modules/login/client/components";
import { getLoginViewPage } from "@/modules/login/server/page";
import { IEntity } from "@/modules/model";
import {
  TryViewProfile,
  TryProfile,
  TryProfileList,
} from "@/modules/profile/client/components";
import { CaregiverPathsGQL, MidwifePathsGQL } from "@/modules/profile/query";
import {
  getProfileListPage,
  getViewProfilePage,
} from "@/modules/profile/server/pages";
import { TryRegistration } from "@/modules/registration/client/components";
import { getRegistrationViewPage } from "@/modules/registration/server/page";

import { getEditProfilePage } from "@/modules/editProfile/server/page";
import { TryEditProfile } from "@/modules/editProfile/client/components";

import { TryLandingPage } from "@/modules/landingPage/client/components";
import { getProfilePage } from "@/modules/profile/server/pages";

// Components

import { getShell } from "@/modules/shell/query";
import { generateShellData } from "@/modules/shell/client/utils";
import { Shell } from "@/modules/shell/client/components";

import { IPageConfig, IPageProps } from "@/modules/shell/types";
import { AppPagePathsGQL } from "@/modules/apppage/query";
import { getStaticProps as getStaticAppPage } from "@/modules/apppage/server/generators";
import { TryAppPage } from "@/modules/apppage/client/components";

import { getUserFeedbackPage } from "@/modules/userFeedback/server/generators";
import { TryUserFeedback } from "@/modules/userFeedback/client/components";

import { TryUserFeedbackThanks } from "@/modules/userFeedback/client/components";
import { getUserFeedbackThanksPage } from "@/modules/userFeedback/server/generators";
import { getStaticProps as getStaticSearchViewProps } from "@/modules/search/server/generators";

// Components
import { GetStaticPaths, GetStaticProps } from "next/types";
import { landingPagePaths } from "@/modules/landingPage/types";
import { TrySearch } from "@/modules/search/client/components";

import { ArticlePathsGQL } from "@/modules/editorial/article/query";
import { getArticlePage } from "@/modules/editorial/article/server/page";
import { TryArticle } from "@/modules/editorial/article/client/components";

import { CategoryPathsGQL } from "@/modules/editorial/category/query";
import { getCategoryPage } from "@/modules/editorial/category/server/page";
import { TryCategory } from "@/modules/editorial/category/client/components";
import { segmentsToRoute } from "@/modules/common/utils";

let dynamicProps: any;
const isDesignContext = process.env.HEDI_ENV !== undefined ? true : false;

const getDesignProps = async () => {
  const { existsSync } = await import("fs");
  const { join } = await import("path");
  if (existsSync(join(__dirname, "../design/imports")))
    //@ts-ignore
    return import("../design/imports").then(({ propsMap }) => propsMap);
  else return null;
};

export const getStaticPaths: GetStaticPaths<ISegmentParam> = async context => {
  if (isDesignContext) dynamicProps = await getDesignProps();

  const pathQueries = [
    CaregiverPathsGQL,
    MidwifePathsGQL,
    AppPagePathsGQL,
    ArticlePathsGQL,
    CategoryPathsGQL,
  ];
  const locales = context?.locales ?? [];
  const paths = [];
  for (const lang of locales) {
    paths.push(...(await getSegmentsPaths(pathQueries, lang)));
  }
  paths.push(...landingPagePaths);

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<
  IPageProps<IEntity>,
  ISegmentParam
> = async ({ params, locale }) => {
  const segments = params?.segments ?? [];
  let content: (IEntity & IPageConfig) | null = null;
  const route = segmentsToRoute(segments, locale ?? "de");

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
    // TODO check if right place for this query
    if (route) {
      if (!content) content = await getLoginViewPage(route);
      if (!content) content = await getRegistrationViewPage(route);
      if (!content) content = await getEditProfilePage(route);
      if (!content) content = await getArticlePage(route);
      if (!content) content = await getCategoryPage(route);
      if (!content) content = await getViewProfilePage(route);
      if (!content) content = await getProfilePage(route);
      if (!content) content = await getProfileListPage(route);
      if (!content)
        content = await getUserFeedbackPage(params?.segments, locale);
      if (!content)
        content = await getUserFeedbackThanksPage(params?.segments, locale);
      if (!content)
        content = await getLandingPageViewProps(params?.segments, locale);
      if (!content)
        content = await getStaticSearchViewProps(params?.segments, locale);
    }
  }
  if (!content) {
    content = await getStaticAppPage(params?.segments, locale);
  }
  if (!content)
    return {
      redirect: {
        destination: "/" + (locale ?? ""),
        permanent: false,
      },
    };
  // ShellStuff

  const shellKey = {
    header: [
      "editprofile",
      "viewprofile",
      "profiles",
      "userfeedback",
      "search",
    ],
    footer: ["imprint", "privacy"],
    userMenu: ["login", "logout", "viewprofile"],
  };
  const shellData = await getShell(locale, shellKey);
  const shell = generateShellData(content, shellData);
  return {
    props: { content, shell },
    revalidate: content.revalidate,
  };
};

export default function segments(props: IPageProps<IAppPage>) {
  const { content } = props;
  return (
    <Shell {...props}>
      <>
        <TryRegistration content={content} key="registration" />
        <TryViewProfile content={content} key="viewprofile" />
        <TryProfile content={content} key="profile" />
        <TryProfileList content={content} key="profileList" />
        <TryLogin content={content} key="login" />
        <TryEditProfile content={content} key="editProfile" />
        <TryArticle content={content} key="article" />
        <TryCategory content={content} key="category" />
        <TryUserFeedback content={content} key="userfeedback" />
        <TryUserFeedbackThanks content={content} key="userfeedbackThanks" />
        <TryLandingPage content={content} key="landingpage" />
        <TrySearch content={content} key="search" />
        <TryAppPage content={content} key="apppage" />
      </>
    </Shell>
  );
}
