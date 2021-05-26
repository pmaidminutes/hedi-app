import { Slider } from "@/modules/model/components";
import { SliderProps } from "carbon-components-react";

export interface ISliderProps
  extends Slider,
    Omit<SliderProps, "labelText" | "id"> {}

export function transformSlider(props: ISliderProps): SliderProps {
  const { kind, ariaLabel, ...rest } = props;
  return { "aria-label": ariaLabel, ...rest };
}
