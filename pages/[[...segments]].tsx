import { getSegmentsPaths } from "@/modules/common/query";
// Types
import { ISegmentParam } from "@/modules/common/types";
import { getStaticProps as getLandingPageViewProps } from "@/modules/landingPage/server/generators";
import { TryLogin } from "@/modules/login/client/components";
import { LoginViewPathsGQL } from "@/modules/login/query";
import { getStaticProps as getLoginViewProps } from "@/modules/login/server/generators";
import { IEntityLocalized, IEntityTranslated, ITyped } from "@/modules/model";
import {
  TryProfile,
  TryProfileList,
} from "@/modules/profile/client/components";
import {
  CaregiverPathsGQL,
  MidwifePathsGQL,
  ProfileListPathsGQL,
} from "@/modules/profile/query";
import { getStaticProps as getProfileListViewProps } from "@/modules/profile/server/generators/getProfileListStaticProps";
import { TryRegistration } from "@/modules/registration/components";
import { RegistrationViewPathsGQL } from "@/modules/registration/query";
import { getStaticProps as getRegistrationViewProps } from "@/modules/registration/server/generators";
import { Footer, Header } from "@/modules/shell/components";

import { TryLandingPage } from "@/modules/landingPage/client/components";
import { getStaticProps as getProfileProps } from "@/modules/profile/server/generators/getProfileStaticProps";

// Components

import { useShell } from "@/modules/shell/hooks";
// Types
import {
  getShell,
  getShellLinksGQL,
  LanguagesGQL,
} from "@/modules/shell/query";
import { IShellProps, IPageConfig } from "@/modules/shell/types";
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

interface ISegmentPageProps {
  content: ITyped;
  shell: Partial<IShellProps>;
}

export const getStaticProps: GetStaticProps<
  ISegmentPageProps,
  ISegmentParam
> = async ({ params, locale }) => {
  const segments = params?.segments ?? [];
  let content: (ITyped & IPageConfig) | null = null;

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
    if (!content) content = await getProfileProps(params?.segments, locale);
    if (!content)
      content = await getProfileListViewProps(params?.segments, locale);
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
  const shellQueries = [
    getShellLinksGQL("footer", ["imprint", "privacy"]),
    getShellLinksGQL("header", ["imprint", "privacy"]),
    LanguagesGQL,
  ];
  const { languages, ...rest } = await getShell(locale, shellQueries);
  const shell = useShell(languages, content, rest);

  return {
    props: { content, shell },
  };
};

export default function segments(props: ISegmentPageProps) {
  const { content, shell } = props;
  const { label } = content as IEntityLocalized;

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
