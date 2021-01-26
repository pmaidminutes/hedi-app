import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next/types";
import { ISegmentParam } from "@/modules/editorial/types";
import { getStaticProps as getCaregiverProps } from "@/modules/profile/server/generators/getCaregiverStaticProps";
import { getStaticPaths as getCaregiverPaths } from "@/modules/profile/server/generators/getStaticCaregiverPaths";
import { getStaticProps as getMidwifeProps } from "@/modules/profile/server/generators/getMidwifeStaticProps";
import { getStaticPaths as getMidwifePaths } from "@/modules/profile/server/generators/getStaticMidwifePaths";
import { Header } from "@/modules/shell/components";
import { ICaregiver, IMidwife } from "@/modules/profile/types";
import { Profile } from "@/modules/profile/client/components";

export const getStaticPaths: GetStaticPaths<ISegmentParam> = async context => {
  console.log({ context });
  const paths = [];
  paths.push(...(await getCaregiverPaths()));
  paths.push(...(await getMidwifePaths()));
  console.log({ paths });
  return { paths, fallback: false };
};

export interface IProfilePageProps {
  content: ICaregiver | IMidwife;
}
export const getStaticProps: GetStaticProps<
  IProfilePageProps,
  ISegmentParam
> = async ({ params, locale }) => {
  const segments = params?.segments ?? [];

  let content;
  content = await getCaregiverProps(params?.segments);
  if (!content) content = await getMidwifeProps(params?.segments);
  console.log({ content });

  if (!content) {
    console.log("couldn't find content for path ", segments.join("/"));
    throw Error("Houston, we have got a problem");
  }

  return { props: { content } };
};

export default function profilePage(props: IProfilePageProps) {
  const { content } = props;
  return (
    <div>
      <Head>
        <title>HEDI App</title>
      </Head>
      <Header {...content} />
      <main>
        <Profile content={content} />
      </main>
    </div>
  );
}
