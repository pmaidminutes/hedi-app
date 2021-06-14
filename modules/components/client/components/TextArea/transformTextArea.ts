import { ITextAreaComponent } from "../../../types";
import { HTML } from "@/modules/react/html/HTML";
import { TextAreaProps } from "carbon-components-react";
import { PartialBy } from "@/modules/common/utils";

export type ITextAreaProps = PartialBy<ITextAreaComponent, "kind"> &
  Omit<TextAreaProps, "helperText" | "id" | "labelText">;

export function transformTextArea(props: ITextAreaProps): TextAreaProps {
  const { id, name, kind, isRequired, labelText, helperText, ...rest } = props;

  return {
    name: name || id,
    labelText: HTML({ data: labelText }) || "",
    helperText: HTML({ data: helperText }),
    id,
    ...rest,
  };
}
