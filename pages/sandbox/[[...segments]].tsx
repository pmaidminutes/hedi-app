import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next/types";
import { ISegmentParam } from "@/modules/editorial/types";
import { getStaticProps as getCaregiverProps } from "@/modules/profile/server/generators/getCaregiverStaticProps";
import { getStaticPaths as getCaregiverPaths } from "@/modules/profile/server/generators/getStaticCaregiverPaths";
import { getStaticProps as getMidwifeProps } from "@/modules/profile/server/generators/getMidwifeStaticProps";
import { getStaticPaths as getMidwifePaths } from "@/modules/profile/server/generators/getStaticMidwifePaths";
import { Header } from "@/modules/shell/components";
import { TryProfile } from "@/modules/profile/client/components";
import { ISegmentPageProps } from "../[[...segments]]";

export const getStaticPaths: GetStaticPaths<ISegmentParam> = async context => {
  const locales = context?.locales ?? [];
  const paths = [];
  paths.push(...(await getCaregiverPaths(locales)));
  paths.push(...(await getMidwifePaths(locales)));
  console.log({ paths });
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<
  ISegmentPageProps,
  ISegmentParam
> = async ({ params, locale }) => {
  const segments = params?.segments ?? [];

  let content;
  content = await getCaregiverProps(params?.segments, locale);
  if (!content) content = await getMidwifeProps(params?.segments, locale);
  console.log({ content });

  if (!content) {
    console.log("couldn't find content for path ", segments.join("/"));
    throw Error("Houston, we have got a problem");
  }

  return { props: { content } };
};

export default function profilePage(props: ISegmentPageProps) {
  const { content } = props;
  return (
    <div>
      <Head>
        <title>HEDI App</title>
      </Head>
      <Header {...content} />
      <main>
        <TryProfile {...content} />
      </main>
    </div>
  );
}
