import React from "react";
import { TextInput as ITextInput } from "@/modules/model/components";
import { TextInputProps } from "carbon-components-react";
import { TextInput as CarbonTextInput } from "carbon-components-react";

export const TextInput = (props: ITextInput & TextInputProps) => {
  // console.log({ props });
  const {
    kind,
    labelText,
    placeholder,
    id,
    helperText,
    type,
    ariaLabel,
  } = props;
  return (
    <CarbonTextInput
      {...props}
      aria-label={ariaLabel || ""}
      // id={id}
      // labelText={labelText ?? ""}
      // placeholder={placeholder}
      // helperText={helperText}
      // type={type}
    />
  );
};
