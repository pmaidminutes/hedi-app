import { NumberInput } from "@/modules/model/components";
import { NumberInputProps } from "carbon-components-react";

export interface INumberInputProps
  extends NumberInput,
    Omit<NumberInputProps, "min" | "max" | "value" | "helperText" | "label"> {}

export function transformNumberInput(
  props: INumberInputProps
): NumberInputProps {
  const { kind, value, ...rest } = props;
  return { value: value || "", ...rest };
}
