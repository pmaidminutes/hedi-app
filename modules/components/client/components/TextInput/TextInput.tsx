import React from "react";
import { TextInput as ITextInput } from "@/modules/model/components";
import { TextInputProps } from "carbon-components-react";
import { TextInput as CarbonTextInput } from "carbon-components-react";
import { transformTextInput } from "./transformTextInput";

export const TextInput = (props: ITextInput & TextInputProps) => {
  const data = transformTextInput(props);
  return <CarbonTextInput {...data} />;
};
