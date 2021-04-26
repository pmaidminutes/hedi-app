import { Body, BodyKind } from "./Body";
import { Button, ButtonKind } from "./Button";
import { Checkbox, CheckboxKind } from "./Checkbox";
import { DatePicker, DatePickerKind } from "./DatePicker";
import { Generic, GenericKind } from "./Generic";

export type HTML = string;

export type ComponentKind =
  | never
  | BodyKind
  | ButtonKind
  | CheckboxKind
  | DatePickerKind
  | GenericKind;

export interface IComponent {
  kind: ComponentKind;
  id: string;
}

export type Component = Body | Button | Checkbox | DatePicker | Generic;
