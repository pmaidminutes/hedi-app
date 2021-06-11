import { ISliderComponent } from "../../../types";
import { HTML } from "@/modules/react/html/HTML";
import { SliderProps } from "carbon-components-react";

export interface ISliderProps
  extends ISliderComponent,
    Omit<SliderProps, "labelText" | "id"> {}

export function transformSlider(props: ISliderProps): SliderProps {
  const { kind, labelText, ariaLabel, ...rest } = props;
  // TODO muss das anders?
  return {
    labelText: HTML({ data: labelText }),
    "aria-label": ariaLabel,
    ...rest,
  };
}
