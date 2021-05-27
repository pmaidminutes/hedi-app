import { GetStaticPaths, GetStaticProps } from "next/types";

import { IEntity } from "@/modules/model";

// common
import {
  AppPageGQL,
  isIAppPage,
  IAppPage,
  ISegmentParam,
} from "@/modules/common/types";
import { segmentsToRoute } from "@/modules/common/utils";
import {
  getIEntitiesTranslated,
  getSegmentsPaths,
} from "@/modules/common/query";

// Shell
import { getShell } from "@/modules/shell/query";
import { generateShellData } from "@/modules/shell/client/utils";
import { Shell } from "@/modules/shell/client/components";
import { IPageConfig, IPageProps } from "@/modules/shell/types";

// AppPage
import { AppPagePathsGQL } from "@/modules/apppage/query";
import { getAppPagePage } from "@/modules/apppage/server/page";
import { TryAppPage } from "@/modules/apppage/client/components";

// LandingPage
import { landingPagePaths } from "@/modules/landingPage/types";
import {
  getLandingPage,
  isLandingPageRoute,
} from "@/modules/landingPage/server";
import { TryLandingPage } from "@/modules/landingPage/client/components";

// Login
import { getLoginPage } from "@/modules/login/server/page";
import { TryLogin } from "@/modules/login/client/components";
// Registration
import { getRegistrationPage } from "@/modules/registration/server/page";
import { TryRegistration } from "@/modules/registration/client/components";

// Search
import { getSearchPage } from "@/modules/search/server/page";
import { TrySearch } from "@/modules/search/client/components";

// Article
import { ArticleGQL, isIArticle } from "@/modules/editorial/article/types";
import { ArticlePathsGQL } from "@/modules/editorial/article/query";
import { getArticlePage } from "@/modules/editorial/article/server/page";
import { TryArticle } from "@/modules/editorial/article/client/components";
// Category
import { CategoryGQL, isICategory } from "@/modules/editorial/category/types";
import { CategoryPathsGQL } from "@/modules/editorial/category/query";
import { getCategoryPage } from "@/modules/editorial/category/server/page";
import { TryCategory } from "@/modules/editorial/category/client/components";
// Glossary
import { GlossaryPathsGQL } from "@/modules/editorial/glossary/query";
import { getGlossaryPage } from "@/modules/editorial/glossary/server";
import { TryGlossary } from "@/modules/editorial/glossary/client/components";

// TODO should we remove the design stuff again?
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
  const lang = locale ?? "de";
  const segments = params?.segments ?? [];
  const route = segmentsToRoute(segments, lang);

  let content: (IEntity & IPageConfig) | null = null;

  if (isDesignContext) {
    const data = dynamicProps?.find(
      (element: any) => element[0] === segments.join("/")
    );
    content = data?.[1]?.content;
  }

  // query types with dynamic paths first
  if (isDesignContext && content) {
    //we have a exported content for designing, skip backend fetches
  } else if (isLandingPageRoute(route)) {
    content = await getLandingPage(lang);
  } else if (!content) {
    const gqlTypes = [AppPageGQL, ArticleGQL, CategoryGQL];
    const entities = await getIEntitiesTranslated<IEntity>(gqlTypes, [route]);
    let generic = entities?.[0] ?? null;

    if (isIArticle(generic)) generic = await getArticlePage(generic);
    if (isICategory(generic)) generic = await getCategoryPage(generic);
    // if (isProfile(generic)) generic = await getProfilePage(generic);

    if (isIAppPage(generic)) {
      switch (
        generic.key // should we handle this in the getAppPage, like the paths are handled in AppPagePaths?
      ) {
        case "login":
          generic = await getLoginPage(generic);
          break;
        case "registration":
          generic = await getRegistrationPage(generic);
          break;
        case "search":
          generic = await getSearchPage(generic);
          break;
        default:
          generic = await getAppPagePage(generic);
      }
      // HACK TS: if getSegmentsContent is assigned to content directly, and in the isIAppPage guard applies, ts infers content could be an IAppPage...
      content = generic;
    }

    // this is the only one which doesn't rely on the generic content query because our cms currently cannot resolve this path
    // if we don't find a way to include it in the generic query we should probably cache the possible routes on getPath and match the string
    if (!content) content = await getGlossaryPage(route);
  }
  if (!content)
    return {
      redirect: {
        destination: `/${lang}/`,
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
  // TODO we should probably cache this, especially if shellKey are static most of the time
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
        {/* <TryViewProfile content={content} key="viewprofile" /> */}
        {/* <TryProfile content={content} key="profile" /> */}
        {/* <TryProfileList content={content} key="profileList" /> */}
        <TryLogin content={content} key="login" />
        {/* <TryEditProfile content={content} key="editProfile" /> */}
        <TryArticle content={content} key="article" />
        <TryCategory content={content} key="category" />
        <TryGlossary content={content} key="glossary" />
        {/* <TryUserFeedback content={content} key="userfeedback" /> */}
        {/* <TryUserFeedbackThanks content={content} key="userfeedbackThanks" /> */}
        <TryLandingPage content={content} key="landingpage" />
        <TrySearch content={content} key="search" />
        <TryAppPage content={content} key="apppage" />
      </>
    </Shell>
  );
}
