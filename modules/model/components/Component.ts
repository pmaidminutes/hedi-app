import { Body, BodyKind } from "./Body";
import { Button, ButtonKind } from "./Button";
import { Checkbox, CheckboxKind } from "./Checkbox";

export type HTML = string;

export type ComponentKind = never | BodyKind | ButtonKind | CheckboxKind;

export interface IComponent {
  kind: ComponentKind;
  id: string;
}

export type Component = Body | Button | Checkbox;
