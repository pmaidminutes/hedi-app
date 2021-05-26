import { DatePicker } from "@/modules/model/components";
import { DatePickerProps, DatePickerInputProps } from "carbon-components-react";

export interface IDatePickerProps
  extends DatePicker,
    Omit<DatePickerProps, "id" | "dateFormat" | "minDate" | "maxDate"> {}

interface IDatePickerAndInputProps extends DatePickerProps {
  datePickerInput: DatePickerInputProps[];
}

export function transformDatePicker(
  props: IDatePickerProps
): IDatePickerAndInputProps {
  console.log({ props });
  const { kind, labelText, datePickerType, placeholder, ...rest } = props;
  const text = labelText || "";
  const labelText2 = text + " end";

  const datePickerInput: DatePickerInputProps[] = [
    { labelText: text, id: "start", placeholder },
  ];

  if (datePickerType === "range")
    datePickerInput.push({ labelText: labelText2, id: "end", placeholder });

  return {
    datePickerInput,
    ...rest,
  };
}
