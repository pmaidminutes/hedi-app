import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next/types";
import { ISegmentParam } from "@/modules/editorial/types";
import {
  getStaticPaths as getCaregiverPaths,
  getStaticProps as getCaregiverProps,
} from "@/modules/profile/server";
import { Header } from "@/modules/shell/components";
import { ICaregiver } from "@/modules/profile/types";

export const getStaticPaths: GetStaticPaths<ISegmentParam> = async context => {
  const paths = [];
  paths.push(...(await getCaregiverPaths()));
  console.log({ paths });
  return { paths, fallback: false };
};

export interface IProfilePageProps {
  content: ICaregiver;
}

export const getStaticProps: GetStaticProps<// TODO: type
any> = async ({ params, locale }) => {
  const segments = params?.segments ?? [];

  let content;
  content = await getCaregiverProps(params?.segments);
  console.log({ content });

  if (!content) {
    console.log("couldn't find content for path ", segments.join("/"));
    throw Error("Houston, we have got a problem");
  }

  return { props: { content } };
};

export default function profilePage(props: IProfilePageProps) {
  console.log({ props });
  const { content } = props;
  return (
    <div>
      <Head>
        <title>HEDI App</title>
      </Head>
      <Header {...content} />
      <main>test</main>
    </div>
  );
}
