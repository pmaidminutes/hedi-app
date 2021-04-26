import { HTML, IComponent } from "./Component";

export type DatePickerKind = "DatePicker";

export interface DatePicker extends IComponent {
  kind: DatePickerKind;
  datePickerType: string;
  dateFormat: string;
  labelText?: HTML;
  isRequired?: boolean;
  placeholder?: string;
  minDate?: string;
  maxDate?: string;
}

export const isDatePicker = (obj: IComponent): obj is DatePicker =>
  obj?.id === typeof "string" && obj?.kind === "DatePicker";

export const isDatePickerInstance = (
  obj: IComponent,
  id: string
): obj is DatePicker => isDatePicker(obj) && obj.id === id;