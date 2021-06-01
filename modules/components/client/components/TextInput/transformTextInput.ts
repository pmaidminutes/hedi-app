import { TextInput as ITextInput } from "@/modules/model/components";
import { HTML } from "@/modules/react/html/HTML";
import { TextInputProps } from "carbon-components-react";

export interface ITextInputProps
  extends ITextInput,
    Omit<TextInputProps, "helperText" | "labelText" | "type"> {}

export function transformTextInput(props: ITextInputProps): TextInputProps {
  const {
    kind,
    labelText,
    placeholder,
    id,
    helperText,
    type,
    ariaLabel,
    isRequired,
    ...rest
  } = props;

  return {
    labelText: HTML({ data: labelText }) || "",
    required:isRequired,
    placeholder,
    id,
    helperText: HTML({ data: helperText }),
    type,
    "aria-label": ariaLabel || "",
    ...rest,
  };
}
