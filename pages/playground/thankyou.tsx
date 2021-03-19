import { getAppPage } from "@/modules/common/query";
import { IAppPage } from "@/modules/common/types";
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

export const getStaticProps: GetStaticProps<any, ParsedUrlQuery> = async ({
  locale,
}) => {
  let appPage = await getAppPage("userfeedback-thankyou", locale);
  return {
    props: { locale, appPage },
  };
};

export default function thankYouPage({
  locale,
  appPage,
}: {
  locale: string;
  appPage: IAppPage;
}) {
  const { label, key } = appPage;
  // TODO show the fields
  return <>{label}</>;
}
