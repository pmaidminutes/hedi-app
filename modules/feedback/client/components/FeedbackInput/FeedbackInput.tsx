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

export const FeedbackInput = ({
  body,
  textArea,
}: {
  body: IBody | undefined;
  textArea: ITextArea | undefined;
}) => {
  return (
    <div className="hedi--userfeedback-item">
      {body && (
        <div className="hedi--userfeedback-text">
          <Body {...body}></Body>
        </div>
      )}
      {textArea && <TextArea {...textArea} name={textArea.id} />}
    </div>
  );
};
