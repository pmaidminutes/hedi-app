import { TextArea } from "@/modules/model/components";
import { TextAreaProps } from "carbon-components-react";

export interface ITextAreaProps
  extends TextArea,
    Omit<TextAreaProps, "helperText" | "id" | "labelText"> {}
export function transformTextArea(props: ITextAreaProps): TextAreaProps {
  const { kind,isRequired, labelText, ...rest } = props;

  return { ...rest, labelText: labelText || "" };
}
