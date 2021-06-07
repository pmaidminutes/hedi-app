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

import {
  TryFeedback,
  TryFeedbackThanks,
} from "@/modules/feedback/client/components";
import { TryLogin, TryRegistration } from "@/modules/auth/client";

// LandingPage
import { landingPagePaths } from "@/modules/landingPage/types";
import {
  getLandingPage,
  isLandingPageRoute,
} from "@/modules/landingPage/server";
import { TryLandingPage } from "@/modules/landingPage/client/components";

// Profile
import {
  AssociationGQL,
  isIProfile,
  ProfessionalGQL,
} from "@/modules/profile/types";
import {
  getProfilePage,
  BusinessProfilePathsGQL,
} from "@/modules/profile/server";
import {
  TryProfile,
  TryProfileList,
  TryProfilePreview,
} from "@/modules/profile/client/components";

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
// Page
import { PagePathsGQL, getPageType } from "@/modules/page/server";
import { TryPage } from "@/modules/page/client/components";
import { PageGQL, isIPage, IPage } from "@/modules/page/types";
import { TryTemplate } from "@/modules/template/client";
// Registration

export const getStaticPaths: GetStaticPaths<ISegmentParam> = async context => {
  const pathQueries = [
    AppPagePathsGQL,
    ArticlePathsGQL,
    CategoryPathsGQL,
    GlossaryPathsGQL,
    BusinessProfilePathsGQL,
    PagePathsGQL,
  ];
  // GlossaryPathsGQL,
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

  if (isLandingPageRoute(route)) {
    content = await getLandingPage(lang);
  } else if (!content) {
    const gqlTypes = [
      AppPageGQL,
      ArticleGQL,
      CategoryGQL,
      PageGQL,
      ProfessionalGQL,
      AssociationGQL,
    ];
    const entities = await getIEntitiesTranslated<IEntity>(gqlTypes, [route]);
    let generic = entities?.[0] ?? null;

    if (isIPage(generic)) generic = await getPageType(generic);
    if (isIArticle(generic)) generic = await getArticlePage(generic);
    if (isICategory(generic)) generic = await getCategoryPage(generic);
    if (isIProfile(generic)) generic = await getProfilePage(generic);

    if (isIAppPage(generic)) {
      switch (
        generic.key // should we handle this in the getAppPage, like the paths are handled in AppPagePaths?
      ) {
        case "search":
          generic = await getSearchPage(generic);
          break;
        default:
          generic = await getAppPagePage(generic);
      }
      // HACK TS: if getSegmentsContent is assigned to content directly, and in the isIAppPage guard applies, ts infers content could be an IAppPage...
    }
    content = generic;

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

  // TODO we should probably cache this, especially if shellKey are static most of the time
  const shellData = await getShell(locale);
  const shell = generateShellData(content, shellData);
  return {
    props: { content, shell },
    revalidate: content.revalidate,
  };
};

export default function segments(props: IPageProps<IAppPage & IPage>) {
  const { content } = props;
  return (
    <Shell {...props}>
      <>
        <TryTemplate content={content} key="template" />
        <TryLogin content={content} key="login" />
        <TryRegistration content={content} key="registration" />

        <TryProfilePreview content={content} key="profilePreview" />
        <TryProfile content={content} key="profile" />
        <TryProfileList content={content} key="profileList" />
        {/* <TryEditProfile content={content} key="editProfile" /> */}

        <TryFeedback content={content} key="feedback" />
        <TryFeedbackThanks content={content} key="feedbackThanks" />
        <TryLandingPage content={content} key="landingpage" />

        <TryArticle content={content} key="article" />
        <TryCategory content={content} key="category" />
        <TryGlossary content={content} key="glossary" />

        <TrySearch content={content} key="search" />
        <TryAppPage content={content} key="apppage" />
        <TryPage content={content} key="page" />
      </>
    </Shell>
  );
}
