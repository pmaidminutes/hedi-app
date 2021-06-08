import React from "react";
import { ITextInputComponent } from "../../../types";
import { TextInputProps } from "carbon-components-react";
import { TextInput as CarbonTextInput } from "carbon-components-react";
import { transformTextInput } from "./transformTextInput";

export const TextInput = (props: ITextInputComponent & TextInputProps) => {
  const data = transformTextInput(props);
  return <CarbonTextInput {...data} />;
};
