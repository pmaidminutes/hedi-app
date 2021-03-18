import { getUser } from "@/modules/auth/client";
import { getSegmentsPaths } from "@/modules/common/query";
// Types
import { ISegmentParam } from "@/modules/common/types";
import {
  IAppStyled,
  IEntityLocalized,
  IEntityTranslated,
} from "@/modules/model";
import { Header } from "@/modules/shell/components";
import { TryViewProfile } from "@/modules/viewProfile/components";
import { ViewProfilePathsGQL } from "@/modules/viewProfile/query/getViewProfilePaths";
import { getStaticProps as getViewProfileProps } from "@/modules/viewProfile/server/generators";
// Components
import { Content } from "carbon-components-react";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next/types";
import { useEffect, useState } from "react";

export const getStaticPaths: GetStaticPaths<ISegmentParam> = async context => {
  const pathQueries = [ViewProfilePathsGQL];
  const locales = context?.locales ?? [];
  const paths = [];
  for (const lang of locales) {
    paths.push(...(await getSegmentsPaths(pathQueries, lang)));
  }
  console.log(paths, "paths");

  return { paths, fallback: "blocking" };
};

interface ISegmentPageProps {
  content: IEntityTranslated<IEntityLocalized> & Partial<IAppStyled>;
}

export const getStaticProps: GetStaticProps<
  ISegmentPageProps,
  ISegmentParam
> = async ({ params, locale }) => {
  const segments = params?.segments ?? [];
  let content;
  console.log(params?.segments, "lets check");
  if (!content) content = await getViewProfileProps(params?.segments, locale);
  if (!content) {
    console.log("couldn't find content for path ", segments.join("/"));
    throw Error("Houston, we have got a problem");
  }

  return {
    props: { content },
    revalidate: content.type === "Search" ? 15 : false,
  };
};

export default function profiler(props: ISegmentPageProps) {
  const { content } = props;
  const [hediStyle, setHediStyle] = useState("");
  const [user] = getUser();

  console.log(user, "user");

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
        <TryViewProfile {...content} />
      </Content>
    </div>
  );
}
