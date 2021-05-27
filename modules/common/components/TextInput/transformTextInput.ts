import { TextInput as ITextInput } from "@/modules/model/components";
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
    ...rest
  } = props;

  return {
    labelText: labelText || "",
    placeholder,
    id,
    helperText,
    type,
    "aria-label": ariaLabel || "",
    ...rest,
  };
}
