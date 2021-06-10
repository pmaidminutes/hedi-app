import { GetStaticPaths, GetStaticProps } from "next/types";

import { IEntity } from "@/modules/model";

// common
import { ISegmentParam } from "@/modules/common/types";
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

import {
  TryFeedback,
  TryFeedbackThanks,
} from "@/modules/feedback/client/components";
import { TryLogin, TryRegistration } from "@/modules/auth/client";

// LandingPage
import { landingPagePaths } from "@/modules/landingpage/types";
import { isLandingPageRoute } from "@/modules/landingpage/server";
import { TryProfileTestLandingPage } from "@/modules/landingpage/client/components";

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
// import { getSearchPage } from "@/modules/search/server/page";
// import { TrySearch } from "@/modules/search/client/components";

// Article
import { ArticleGQL, isIArticle } from "@/modules/editorial/article/types";
import { ArticlePathsGQL } from "@/modules/editorial/article/query";
import { getArticlePage } from "@/modules/editorial/article/server/page";
import { TryArticle } from "@/modules/editorial/article/client/components";
// Category
import {
  CategoryGQL,
  isICategory,
} from "@/modules/editorial/category/types";
import { CategoryPathsGQL } from "@/modules/editorial/category/query";
import { getCategoryPage } from "@/modules/editorial/category/server/page";
import {
  TryCategory,
  TryCategoryRoot,
} from "@/modules/editorial/category/client/components";
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
    ArticlePathsGQL,
    CategoryPathsGQL,
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
  let route = segmentsToRoute(segments, lang);

  let content: (IEntity & IPageConfig) | null = null;

  if (isLandingPageRoute(route)) {
    route = "/landingPage";
  }

  const gqlTypes = [
    ArticleGQL,
    CategoryGQL,
    PageGQL,
    ProfessionalGQL,
    AssociationGQL,
  ];
  const entities = await getIEntitiesTranslated<IEntity>(
    gqlTypes,
    [route],
    lang
  );
  let generic = entities?.[0] ?? null;

  if (isIPage(generic)) generic = await getPageType(generic);
  if (isIArticle(generic)) generic = await getArticlePage(generic);
  if (isICategory(generic)) generic = await getCategoryPage(generic);
  if (isIProfile(generic)) generic = await getProfilePage(generic);

  content = generic;

  // this is the only one which doesn't rely on the generic content query because our cms currently cannot resolve this path
  // if we don't find a way to include it in the generic query we should probably cache the possible routes on getPath and match the string
  // if (!content) content = await getGlossaryPage(route);
  // }
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

export default function segments(props: IPageProps<IPage>) {
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
        <TryProfileTestLandingPage
          content={content}
          key="profileTestLandingPage"
        />

        <TryArticle content={content} key="article" />
        <TryCategory content={content} key="category" />
        <TryCategoryRoot content={content} key="categoryroot" />
        {/* <TryGlossary content={content} key="glossary" /> */}

        {/* <TrySearch content={content} key="search" /> */}
        <TryPage content={content} key="page" />
      </>
    </Shell>
  );
}
