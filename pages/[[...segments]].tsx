import { getSegmentsPaths } from "@/modules/common/query";
// Types
import { ISegmentParam } from "@/modules/common/types";
import { getStaticProps as getLandingPageViewProps } from "@/modules/landingPage/server/generators";
import { TryLogin } from "@/modules/login/client/components";
import { LoginViewPathsGQL } from "@/modules/login/query";
import { getStaticProps as getLoginViewProps } from "@/modules/login/server/generators";
import {
  IAppStyled,
  IEntityLocalized,
  IEntityTranslated,
} from "@/modules/model";
import { TryProfile } from "@/modules/profile/client/components";
import { CaregiverPathsGQL, MidwifePathsGQL } from "@/modules/profile/query";
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
import { IShellProps } from "@/modules/shell/types";
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
import { useEffect, useState } from "react";

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
  content: IEntityTranslated<IEntityLocalized> & Partial<IAppStyled>;
  shell: IShellProps;
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
    if (!content) content = await getLoginViewProps(params?.segments, locale);
    if (!content)
      content = await getRegistrationViewProps(params?.segments, locale);
    if (!content) content = await getProfileProps(params?.segments, locale);
    if (!content)
      content = await getUserFeedbackThanksViewProps(params?.segments, locale);
    if (!content)
      content = await getStaticSimplePageViewProps(params?.segments, locale);
  }
  if (!content) {
    content = await getLandingPageViewProps(params?.segments, locale);
  }
  // ShellStuff
  const shellQueries = [
    getShellLinksGQL("links", ["viewprofile"]),
    LanguagesGQL,
  ];
  const { links, languages } = await getShell(locale, shellQueries);
  const shell = useShell(languages, content, links);

  return {
    props: { content, shell },
  };
};

export default function segments(props: ISegmentPageProps) {
  const { content, shell } = props;
  const [hediStyle, setHediStyle] = useState("");
  useEffect(() => {
    setHediStyle(content?.appstyle ?? "");
  }, [content]);

  return (
    <div className={hediStyle}>
      <Head>
        <title>HEDI App</title>
      </Head>
      <Header {...shell} />
      <Content>
        <TryRegistration {...content} key="registration" />
        <TryProfile {...content} key="profile" />
        <TryLogin {...content} key="login" />
        <TryUserFeedbackThanks {...content} key="userfeedback" />
        <TrySimplePage content={content} key="simplepage" />
        <TryLandingPage {...content} key="landingpage" />
      </Content>
      <Footer {...shell} />
    </div>
  );
}
