import { Body, BodyKind } from "./Body";

export type HTML = string;

export type ComponentKind = never | BodyKind;

export interface IComponent {
  kind: ComponentKind;
  id: string;
}

export type Component = Body;
