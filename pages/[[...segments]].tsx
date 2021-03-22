import { getSegmentsPaths } from "@/modules/common/query";
// Types
import { ISegmentParam } from "@/modules/common/types";
import { TryEditProfile } from "@/modules/editProfile/components";
import { EditProfilePathsGQL } from "@/modules/editProfile/query";
import { getStaticProps as getEditProfileProps } from "@/modules/editProfile/server/generators";
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
import { getStaticProps as getCaregiverProps } from "@/modules/profile/server/generators/getCaregiverStaticProps";
import { getStaticProps as getMidwifeProps } from "@/modules/profile/server/generators/getMidwifeStaticProps";
import { TryRegistration } from "@/modules/registration/components/TryRegistration";
import { RegistrationViewPathsGQL } from "@/modules/registration/query";
import { getStaticProps as getRegistrationViewProps } from "@/modules/registration/server/generators";
import { Footer, Header } from "@/modules/shell/components";
import { TryUserFeedbackThanks } from "@/modules/userFeedback/client/components";
import { UserFeedbackThanksViewPathsGQL } from "@/modules/userFeedback/query";
import { getStaticProps as getUserFeedbackThanksViewProps } from "@/modules/userFeedback/server/generators";
import { Content } from "carbon-components-react";
import Head from "next/head";
// Types
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
    //PagePathsGQL,
    //ArticlePathsGQL,
    //CategoryPathsGQL,
    //GlossaryPathsGQL,
    CaregiverPathsGQL,
    MidwifePathsGQL,
    //OrganisationPathsGQL,
    //InstitutionPathsGQL,
    //SearchViewPathsGQL,
    LoginViewPathsGQL,
    EditProfilePathsGQL,
    RegistrationViewPathsGQL,
    UserFeedbackThanksViewPathsGQL,
  ];
  const locales = context?.locales ?? [];
  const paths = [];
  for (const lang of locales) {
    paths.push(...(await getSegmentsPaths(pathQueries, lang)));
  }

  return { paths, fallback: "blocking" };
};

interface IShellProps {
  // TODO: to be implemented
  // header?: IHeaderProps
  // footer?: IFooter
}

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
    console.log(params?.segments);
    // if (!content) content = await getSearchViewProps(params?.segments, locale);
    if (!content) content = await getLoginViewProps(params?.segments, locale);
    if (!content)
      content = await getRegistrationViewProps(params?.segments, locale);
    if (!content) content = await getEditProfileProps(params?.segments, locale);
    // if (!content) content = await getCategoryProps(params?.segments, locale);
    // if (!content) content = await getArticleProps(params?.segments, locale);
    // if (!content) content = await getGlossaryProps(params?.segments, locale);
    if (!content) content = await getCaregiverProps(params?.segments, locale);
    if (!content) content = await getMidwifeProps(params?.segments, locale);
    // if (!content)
    //   content = await getOrganisationProps(params?.segments, locale);
    // if (!content) content = await getInstitutionProps(params?.segments, locale);
    // if (!content) content = await getPageProps(params?.segments, locale);
    if (!content)
      content = await getUserFeedbackThanksViewProps(params?.segments, locale);
  }
  if (!content) {
    console.log("couldn't find content for path ", segments.join("/"));
    throw Error("Houston, we have got a problem");
  }

  return {
    props: { content, shell: {} },
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
        {/* <BreadCrumb content={content} />
        <TryCategory {...content} />
        <TryArticle {...content} />
        <TryGlossary {...content} />
        <TrySearch {...content} />
        <TryPage {...content} /> */}
        <TryRegistration {...content} />
        <TryProfile {...content} />
        <TryLogin {...content} />
        <TryEditProfile {...content} />
        <TryUserFeedbackThanks {...content} />
      </Content>
      <Footer />
    </div>
  );
}
