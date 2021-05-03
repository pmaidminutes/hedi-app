import { HTML, IComponent } from "./Component";

export type SliderKind = "Slider";

export interface Slider extends IComponent {
  kind: SliderKind;
  value: number;
  min: number;
  max: number;
  labelText?: HTML;
  minLabel?: string;
  maxLabel?: string;
  ariaLabel?: string;
}

export const isSlider = (obj: IComponent): obj is Slider =>
  obj?.id === typeof "string" && obj?.kind === "Slider";

export const isSliderInstance = (obj: IComponent, id: string): obj is Slider =>
  isSlider(obj) && obj.id === id;
