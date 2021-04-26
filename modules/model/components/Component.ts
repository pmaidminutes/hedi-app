export type HTML = string;

export type ComponentKind = never;

export interface IComponent {
  kind: ComponentKind;
  id: string;
}
