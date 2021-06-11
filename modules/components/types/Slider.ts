import { HTML, IComponent } from "./Component";
import { getComponentInstance } from "./utils";

export type SliderKind = "Slider";

export interface ISliderComponent extends IComponent {
  kind: SliderKind;
  value: number;
  min: number;
  max: number;
  labelText?: HTML;
  minLabel?: string;
  maxLabel?: string;
  ariaLabel?: string;
}

export const isSlider = (obj: IComponent): obj is ISliderComponent =>
  obj?.kind === "Slider";

export const isSliderInstance = (
  obj: IComponent,
  id: string
): obj is ISliderComponent => isSlider(obj) && obj.id === id;

export const findSliderInstance = (array: IComponent[], id: string) => {
  const element = array.filter(isSlider).find(item => item.id === id);
  return element;
};

export const getSliderInstance = (
  array: IComponent[],
  id: string,
  fallback: Omit<ISliderComponent, "kind" | "id">
) => getComponentInstance("Slider", array, id, fallback);
