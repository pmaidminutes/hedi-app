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
  typeof obj?.id === "string" && obj?.kind === "Slider";

export const isSliderInstance = (obj: IComponent, id: string): obj is Slider =>
  isSlider(obj) && obj.id === id;

export const findSliderInstance = (array: IComponent[], id: string) => {
  const element = array.filter(isSlider).find(item => item.id === id);
  return element;
};
