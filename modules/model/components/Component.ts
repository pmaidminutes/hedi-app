import { Body, BodyKind } from "./Body";
import { Button, ButtonKind } from "./Button";
import { Checkbox, CheckboxKind } from "./Checkbox";
import { DatePicker, DatePickerKind } from "./DatePicker";
import { Generic, GenericKind } from "./Generic";
import { Group, GroupKind } from "./Group";
import { Label, LabelKind } from "./Label";
import { Link, LinkKind } from "./Link";

export type HTML = string;

export type ComponentKind =
  | never
  | BodyKind
  | ButtonKind
  | CheckboxKind
  | DatePickerKind
  | GenericKind
  | GroupKind
  | LabelKind
  | LinkKind;

export interface IComponent {
  kind: ComponentKind;
  id: string;
}

export type Component =
  | Body
  | Button
  | Checkbox
  | DatePicker
  | Generic
  | Group
  | Label
  | Link;
