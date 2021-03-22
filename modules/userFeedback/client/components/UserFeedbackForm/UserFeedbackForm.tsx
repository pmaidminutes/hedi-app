import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { getUserFeedbackLabels } from "@/modules/userFeedback/query/getUserFeedbackLabels";
import { IUIElementTexts } from "@/modules/model";
import {
  MultipleUserFeedback,
  UserFeedbackEntry,
  UserFeedbackSendbox,
} from "@/modules/userFeedback/client/components";

export const getStaticProps: GetStaticProps<any, ParsedUrlQuery> = async ({
  locale,
}) => {
  let elements = await getUserFeedbackLabels(locale);
  return {
    props: { elements, locale },
  };
};

export default function UserFeedbackForm({
  elements,
  locale,
}: {
  elements: IUIElementTexts[];
  locale: string;
}) {
  return (
    <MultipleUserFeedback lang={locale}>
      <UserFeedbackEntry
        elements={elements}
        label="feedback"
        showTitle={true}
      />
      <UserFeedbackSendbox elements={elements} />
    </MultipleUserFeedback>
  );
}
