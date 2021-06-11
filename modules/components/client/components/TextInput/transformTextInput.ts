import { ITextInputComponent } from "../../../types";
import { HTML } from "@/modules/react/html/HTML";
import { TextInputProps } from "carbon-components-react";

export interface ITextInputProps
  extends ITextInputComponent,
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
    name,
    ...rest
  } = props;

  return {
    name: name || id,
    labelText: HTML({ data: labelText }) || "",
    required: isRequired,
    placeholder,
    id,
    helperText: HTML({ data: helperText }),
    type,
    "aria-label": ariaLabel || "",
    ...rest,
  };
}
