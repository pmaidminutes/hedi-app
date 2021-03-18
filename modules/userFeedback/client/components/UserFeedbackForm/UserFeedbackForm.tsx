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
    props: { elements },
  };
};

export default function UserFeedbackForm({
  elements,
}: {
  elements: IUIElementTexts[];
}) {
  return (
    <MultipleUserFeedback>
      <UserFeedbackEntry
        elements={elements}
        label="feedback"
        showTitle={true}
      />
      <UserFeedbackSendbox elements={elements} />
    </MultipleUserFeedback>
  );
}
