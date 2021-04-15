import { getSegmentsPaths } from "@/modules/common/query";
// Types
import { IAppPage, ISegmentParam } from "@/modules/common/types";
import { getStaticProps as getLandingPageViewProps } from "@/modules/landingPage/server/generators";
import { TryLogin } from "@/modules/login/client/components";
import { LoginViewPathsGQL } from "@/modules/login/client/request";
import { getStaticProps as getLoginViewProps } from "@/modules/login/server/generators";
import { IEntity } from "@/modules/model";
import {
  TryViewProfile,
  TryProfile,
  TryProfileList,
} from "@/modules/profile/client/components";
import {
  CaregiverPathsGQL,
  MidwifePathsGQL,
  ProfileListPathsGQL,
  ViewProfilePathsGQL,
} from "@/modules/profile/query";
import {
  getProfileListPage,
  getViewProfilePage,
} from "@/modules/profile/server/generators";
import { TryRegistration } from "@/modules/registration/client/components";
import { RegistrationViewPathsGQL } from "@/modules/registration/query";
import { getStaticProps as getRegistrationViewProps } from "@/modules/registration/server/generators";

import { EditProfilePathsGQL } from "@/modules/editProfile/query";
import { getStaticProps as getEditProfilePage } from "@/modules/editProfile/server/generators";
import { TryEditProfile } from "@/modules/editProfile/client/components";

import { TryLandingPage } from "@/modules/landingPage/client/components";
import { getProfilePage } from "@/modules/profile/server/generators";

// Components

import { getShell } from "@/modules/shell/query";
import { generateShellData } from "@/modules/shell/client/utils";
import { Shell } from "@/modules/shell/client/components";

import { IPageConfig, IPageProps } from "@/modules/shell/types";
import { TrySimplePage } from "@/modules/simplePage/client/components";
import { SimplePageViewPathsGQL } from "@/modules/simplePage/query";
import { getStaticProps as getStaticSimplePageViewProps } from "@/modules/simplePage/server/generators";

import { UserFeedbackViewPathsGQL } from "@/modules/userFeedback/query";
import { getUserFeedbackPage } from "@/modules/userFeedback/server/generators";
import { TryUserFeedback } from "@/modules/userFeedback/client/components";

import { TryUserFeedbackThanks } from "@/modules/userFeedback/client/components";
import { UserFeedbackThanksViewPathsGQL } from "@/modules/userFeedback/query";
import { getUserFeedbackThanksPage } from "@/modules/userFeedback/server/generators";
import { SearchViewPathsGQL } from "@/modules/search/query";
import { getStaticProps as getStaticSearchViewProps } from "@/modules/search/server/generators";

// Components
import { GetStaticPaths, GetStaticProps } from "next/types";
import { landingPagePaths } from "@/modules/landingPage/types";
import { TrySearch } from "@/modules/search/client/components";

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
    ProfileListPathsGQL,
    LoginViewPathsGQL,
    RegistrationViewPathsGQL,
    EditProfilePathsGQL,
    ViewProfilePathsGQL,
    UserFeedbackViewPathsGQL,
    UserFeedbackThanksViewPathsGQL,
    SimplePageViewPathsGQL,
    SearchViewPathsGQL,
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
    if (!content) content = await getLoginViewProps(params?.segments, locale);
    if (!content)
      content = await getRegistrationViewProps(params?.segments, locale);
    if (!content) content = await getEditProfilePage(params?.segments, locale);
    if (!content) content = await getViewProfilePage(params?.segments, locale);
    if (!content) content = await getProfilePage(params?.segments, locale);
    if (!content) content = await getProfileListPage(params?.segments, locale);
    if (!content) content = await getUserFeedbackPage(params?.segments, locale);
    if (!content)
      content = await getUserFeedbackThanksPage(params?.segments, locale);
    if (!content)
      content = await getStaticSimplePageViewProps(params?.segments, locale);
    if (!content)
      content = await getStaticSearchViewProps(params?.segments, locale);
  }
  if (!content) {
    content = await getLandingPageViewProps(params?.segments, locale);
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
        <TryUserFeedback content={content} key="userfeedback" />
        <TryUserFeedbackThanks content={content} key="userfeedback" />
        <TrySimplePage content={content} key="simplepage" />
        <TryLandingPage content={content} key="landingpage" />
        <TrySearch content={content} key="search" />
      </>
    </Shell>
  );
}
