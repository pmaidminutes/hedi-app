import { IAppPage } from "@/modules/common/types";
import {
  Body,
  IBodyProps,
  ITextAreaProps,
  Label,
  TextArea,
  TextInput,
} from "@/modules/components";
import {
  Body as IBody,
  Label as ILabel,
  TextArea as ITextArea,
} from "@/modules/model/components";

// UNUSED
export interface IUserFeedbackEntryProps {
  content: IAppPage;
}

export const FeedbackInput = ({
  body,
  input,
}: {
  body: IBody | undefined;
  input: ITextArea | undefined;
}) => {
  return (
    <div className="hedi--userfeedback-item">
      {body && (
        <div className="hedi--userfeedback-text">
          <Body {...body}></Body>
        </div>
      )}
      {input && <TextArea {...input} name={input.id} />}
    </div>
  );
};
