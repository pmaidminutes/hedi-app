import { HTML, IComponent } from "./Component";

export type DatePickerKind = "DatePicker";

export interface DatePicker extends IComponent {
  id: string;
  kind: DatePickerKind;
  datePickerType: "simple" | "single" | "range";
  dateFormat: string;
  labelText?: HTML;
  labelTextEnd?: HTML;
  isRequired?: boolean;
  placeholder?: string;
  minDate?: string;
  maxDate?: string;
}

export const isDatePicker = (obj: IComponent): obj is DatePicker =>
  obj?.kind === "DatePicker";

export const isDatePickerInstance = (
  obj: IComponent,
  id: string
): obj is DatePicker => isDatePicker(obj) && obj.id === id;

export const findDatePickerInstance = (array: IComponent[], id: string) => {
  const element = array.filter(isDatePicker).find(item => item.id === id);
  return element;
};
