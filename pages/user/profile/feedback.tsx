import { GetStaticProps } from "next";
import { IUserFeedbackView } from "@/modules/userFeedback/types";
import { getUserFeedbackStatic } from "@/modules/userFeedback/query";
import { Footer, Header } from "@/modules/shell/components";

import { Content } from "carbon-components-react";
import Head from "next/head";
import { UserFeedback } from "@/modules/userFeedback/client/components/UserFeedback/UserFeedback";

interface IUserFeedbackProps {
  content: IUserFeedbackView;
  locale: string;
}

export const getStaticProps: GetStaticProps<IUserFeedbackProps> = async ({
  locale,
}) => {
  locale = locale ?? "de";
  const content = await getUserFeedbackStatic(locale);
  if (!content) {
    console.error("err");
    throw Error();
  }

  return {
    props: { content, locale: locale },
  };
};

export default function userfeedback({ content, locale }: IUserFeedbackProps) {
  return (
    <div>
      <Head>
        <title>HEDI - {content.label}</title>
      </Head>
      <Header {...content} />
      <Content>
        <UserFeedback content={content} locale={locale} />
      </Content>
      <Footer />
    </div>
  );
}
