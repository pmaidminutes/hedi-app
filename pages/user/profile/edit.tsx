import { Footer, Header } from "@/modules/shell/components";
import { EditProfile } from "@/modules/editProfile/components";
import { getEditProfileStatic } from "@/modules/editProfile/query";

import { Content } from "carbon-components-react";
import Head from "next/head";
// Types
import { GetStaticPaths, GetStaticProps } from "next/types";
import { IEditProfileView } from "@/modules/editProfile/types";

interface IShellProps {
  // TODO: to be implemented
  // header?: IHeaderProps
  // footer?: IFooter
}

interface IEditProfilePageProps {
  content: IEditProfileView;
  shell: IShellProps;
}

export const getStaticProps: GetStaticProps<IEditProfilePageProps> = async ({
  locale,
}) => {
  const content = await getEditProfileStatic(locale ?? "de");
  if (!content) {
    console.error("err");
    throw Error();
  }

  return {
    props: { content, shell: {} },
  };
};

export default function segments(props: IEditProfilePageProps) {
  const { content } = props;
  return (
    <div>
      <Head>
        <title>HEDI - {content.label}</title>
      </Head>
      <Header {...content} />
      <Content>
        <EditProfile content={content as IEditProfileView} />
      </Content>
      <Footer />
    </div>
  );
}
