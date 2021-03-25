import { GetStaticProps } from "next";

import { IPageProps } from "@/modules/shell/types";
import { getShell } from "@/modules/shell/query";
import { useShell } from "@/modules/shell/hooks";
import { Shell } from "@/modules/shell/components";

import { IUserFeedbackView } from "@/modules/userFeedback/types";
import { getUserFeedbackStatic } from "@/modules/userFeedback/query";
import { UserFeedback } from "@/modules/userFeedback/client/components";

export const getStaticProps: GetStaticProps<
  IPageProps<IUserFeedbackView>
> = async ({ locale }) => {
  const shellKeys = {
    header: ["editprofile", "viewprofile", "profiles", "userfeedback"],
    footer: ["imprint", "privacy"],
  };

  const [content, shellConfig] = await Promise.all([
    getUserFeedbackStatic(locale ?? "de"),
    getShell(locale, shellKeys),
  ]);

  if (!content) {
    console.error("err");
    throw Error();
  }

  const shell = useShell(content, shellConfig);

  return {
    props: { content, shell },
  };
};

export default function userfeedback(props: IPageProps<IUserFeedbackView>) {
  const { content } = props;
  return (
    <Shell {...props}>
      <UserFeedback content={content} locale={content.lang} />
    </Shell>
  );
}
