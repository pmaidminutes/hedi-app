import { Body, BodyKind } from "./Body";
import { Button, ButtonKind } from "./Button";
import { Checkbox, CheckboxKind } from "./Checkbox";
import { DatePicker, DatePickerKind } from "./DatePicker";

export type HTML = string;

export type ComponentKind =
  | never
  | BodyKind
  | ButtonKind
  | CheckboxKind
  | DatePickerKind;

export interface IComponent {
  kind: ComponentKind;
  id: string;
}

export type Component = Body | Button | Checkbox | DatePicker;
