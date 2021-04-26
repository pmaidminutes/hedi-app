import { Body, BodyKind } from "./Body";
import { Button, ButtonKind } from "./Button";

export type HTML = string;

export type ComponentKind = never | BodyKind | ButtonKind;

export interface IComponent {
  kind: ComponentKind;
  id: string;
}

export type Component = Body | Button;
