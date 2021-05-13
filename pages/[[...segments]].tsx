import { getSegmentsContent, getSegmentsPaths } from "@/modules/common/query";
// Types
import {
  AppPageGQL,
  isIAppPage,
  IAppPage,
  ISegmentParam,
} from "@/modules/common/types";
import { getLandingPage } from "@/modules/landingPage/server/page";
import { TryLogin } from "@/modules/login/client/components";
import { getLoginPage } from "@/modules/login/server/page";
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
import { getRegistrationPage } from "@/modules/registration/server/page";

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
import { getAppPagePage } from "@/modules/apppage/server/page";
import { TryAppPage } from "@/modules/apppage/client/components";

import { getUserFeedbackPage } from "@/modules/userFeedback/server/pages";
import { TryUserFeedback } from "@/modules/userFeedback/client/components";

import { TryUserFeedbackThanks } from "@/modules/userFeedback/client/components";
import { getUserFeedbackThanksPage } from "@/modules/userFeedback/server/pages";
import { getSearchPage } from "@/modules/search/server/page";

// Components
import { GetStaticPaths, GetStaticProps } from "next/types";
import { landingPagePaths } from "@/modules/landingPage/types";
import { TrySearch } from "@/modules/search/client/components";

import { ArticlePathsGQL } from "@/modules/editorial/article/query";
import { getArticlePage } from "@/modules/editorial/article/server/page";
import { TryArticle } from "@/modules/editorial/article/client/components";

import { GlossaryPathsGQL } from "@/modules/editorial/glossary/query";
import { getGlossaryPage } from "@/modules/editorial/glossary/server";
import { TryGlossary } from "@/modules/editorial/glossary/client/components";

import { CategoryPathsGQL } from "@/modules/editorial/category/query";
import { getCategoryPage } from "@/modules/editorial/category/server/page";
import { TryCategory } from "@/modules/editorial/category/client/components";
import { segmentsToRoute } from "@/modules/common/utils";
import { CaregiverGQL, MidwifeGQL } from "@/modules/profile/types";
import { ArticleGQL } from "@/modules/editorial/article/types";
import { CategoryGQL } from "@/modules/editorial/category/types";

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
    GlossaryPathsGQL,
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
    const gqlTypes = [
      AppPageGQL,
      ArticleGQL,
      CategoryGQL,
      CaregiverGQL,
      MidwifeGQL,
    ];
    // TODO check if right place for this query
    if (route) {
      if (!content) {
        let generic = await getSegmentsContent(route, gqlTypes);

        if (isIAppPage(generic)) {
          switch (generic.key) {
            case "login":
              generic = await getLoginPage(generic);
              break;
            case "registration":
              generic = await getRegistrationPage(generic);
              break;
            case "editprofile":
              generic = await getEditProfilePage(generic);
              break;
            case "viewprofile":
              generic = await getViewProfilePage(generic);
              break;
            case "profiles":
              generic = await getProfileListPage(generic);
              break;
            case "userfeedback":
              generic = await getUserFeedbackPage(generic);
              break;
            case "userfeedbackThanks":
              generic = await getUserFeedbackThanksPage(generic);
              break;
            case "search":
              generic = await getSearchPage(generic);
              break;
          }
        }
        // HACK TS: if getSegmentsContent is assigned to content directly, and in the isIAppPage guard applies, ts infers content could be an IAppPage...
        content = generic;
      }
      if (!content) content = await getArticlePage(route);
      if (!content) content = await getCategoryPage(route);
      if (!content) content = await getProfilePage(route);
      if (!content) content = await getLandingPage(route);
      if (!content) content = await getGlossaryPage(route);
    }
  }
  if (!content && route) {
    content = await getAppPagePage(route);
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
        <TryGlossary content={content} key="glossary" />
        <TryUserFeedback content={content} key="userfeedback" />
        <TryUserFeedbackThanks content={content} key="userfeedbackThanks" />
        <TryLandingPage content={content} key="landingpage" />
        <TrySearch content={content} key="search" />
        <TryAppPage content={content} key="apppage" />
      </>
    </Shell>
  );
}
