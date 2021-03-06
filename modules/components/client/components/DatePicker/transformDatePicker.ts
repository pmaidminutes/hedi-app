import { IDatePickerComponent } from "../../../types";
import { HTML } from "@/modules/react/html/HTML";
import { DatePickerProps, DatePickerInputProps } from "carbon-components-react";
import { PartialBy } from "@/modules/common/utils";

export type IDatePickerProps = PartialBy<IDatePickerComponent, "kind"> &
  Omit<
    DatePickerProps,
    "id" | "dateFormat" | "minDate" | "maxDate" | "datePickerType"
  >;

interface IDatePickerAndInputProps extends DatePickerProps {
  datePickerInput: DatePickerInputProps[];
}

export function transformDatePicker(
  props: IDatePickerProps
): IDatePickerAndInputProps {
  const {
    id,
    kind,
    labelText,
    labelTextEnd,
    datePickerType,
    placeholder,
    ...rest
  } = props;

  const idFirstElement = datePickerType === "range" ? id + "_start" : id;
  const datePickerInput: DatePickerInputProps[] = [
    {
      labelText: HTML({ data: labelText }) || "",
      id: idFirstElement,
      placeholder,
    },
  ];

  if (datePickerType === "range")
    datePickerInput.push({
      labelText:
        HTML({ data: labelTextEnd }) || HTML({ data: labelText }) || "",
      id: id + "_end",
      placeholder,
    });

  return {
    id,
    datePickerInput,
    ...rest,
  };
}
