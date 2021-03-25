import { getSegmentsPaths } from "@/modules/common/query";
// Types
import { ISegmentParam } from "@/modules/common/types";
import { getStaticProps as getLandingPageViewProps } from "@/modules/landingPage/server/generators";
import { TryLogin } from "@/modules/login/client/components";
import { LoginViewPathsGQL } from "@/modules/login/query";
import { getStaticProps as getLoginViewProps } from "@/modules/login/server/generators";
import { IEntity } from "@/modules/model";
import {
  TryProfile,
  TryProfileList,
} from "@/modules/profile/client/components";
import {
  CaregiverPathsGQL,
  MidwifePathsGQL,
  ProfileListPathsGQL,
} from "@/modules/profile/query";
import { getProfileListPage } from "@/modules/profile/server/generators";
import { TryRegistration } from "@/modules/registration/components";
import { RegistrationViewPathsGQL } from "@/modules/registration/query";
import { getStaticProps as getRegistrationViewProps } from "@/modules/registration/server/generators";
import { Footer, Header } from "@/modules/shell/components";

import { TryLandingPage } from "@/modules/landingPage/client/components";
import { getProfilePage } from "@/modules/profile/server/generators";

// Components

import { useShell } from "@/modules/shell/hooks";
// Types
import {
  getShell,
  getShellLinksGQL,
  LanguagesGQL,
} from "@/modules/shell/query";
import { IPageConfig, IPageProps } from "@/modules/shell/types";
import { TrySimplePage } from "@/modules/simplePage/client/components";
import { SimplePageViewPathsGQL } from "@/modules/simplePage/query";
import { getStaticProps as getStaticSimplePageViewProps } from "@/modules/simplePage/server/generators";
import { TryUserFeedbackThanks } from "@/modules/userFeedback/client/components";
import { UserFeedbackThanksViewPathsGQL } from "@/modules/userFeedback/query";
import { getStaticProps as getUserFeedbackThanksViewProps } from "@/modules/userFeedback/server/generators";
// Components
import { Content } from "carbon-components-react";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next/types";
import { useState, useEffect } from "react";
import { ScrollToTop } from "@/modules/common/components";

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
    CaregiverPathsGQL,
    MidwifePathsGQL,
    ProfileListPathsGQL,
    LoginViewPathsGQL,
    RegistrationViewPathsGQL,
    UserFeedbackThanksViewPathsGQL,
    SimplePageViewPathsGQL,
  ];
  const locales = context?.locales ?? [];
  const paths = [];
  for (const lang of locales) {
    paths.push(...(await getSegmentsPaths(pathQueries, lang)));
  }

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
    if (!content) content = await getProfilePage(params?.segments, locale);
    if (!content) content = await getProfileListPage(params?.segments, locale);
    if (!content)
      content = await getUserFeedbackThanksViewProps(params?.segments, locale);
    if (!content)
      content = await getStaticSimplePageViewProps(params?.segments, locale);
  }
  if (!content) {
    content = await getLandingPageViewProps(params?.segments, locale);
  }
  if (!content) throw Error;
  // ShellStuff

  const shellKey = {
    header: ["editprofile", "viewprofile", "profiles", "userfeedback"],
    footer: ["imprint", "privacy"],
    userMenu: ["login", "logout", "viewprofile"],
  };
  const shellConfig = await getShell(locale, shellKey);
  const shell = useShell(content, shellConfig);
  return {
    props: { content, shell },
  };
};

export default function segments(props: IPageProps<IEntity>) {
  const { content, shell } = props;
  const { label } = content;

  const [hediStyle, setHediStyle] = useState("");
  const [hasHeader, setHasHeader] = useState(true);
  useEffect(() => {
    setHasHeader(shell.useHeader ?? true);
  }, [shell.useHeader]);

  useEffect(() => {
    setHediStyle(shell?.appstyle ?? "");
  }, [shell.appstyle]);

  return (
    <div className={hediStyle}>
      <Head>
        <title>HEDI{label ? ` - ${label}` : null}</title>
      </Head>
      {hasHeader ? <Header {...shell} /> : null}
      <Content>
        <TryRegistration {...content} key="registration" />
        <TryProfile {...content} key="profile" />
        <TryProfileList {...content} key="profileList" />
        <TryLogin {...content} key="login" />
        <TryUserFeedbackThanks {...content} key="userfeedback" />
        <TrySimplePage content={content} key="simplepage" />
        <TryLandingPage {...content} key="landingpage" />
      </Content>
      <Footer {...shell} />
      <ScrollToTop />
    </div>
  );
}
