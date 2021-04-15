import { TextInputProps } from "carbon-components-react";
import { TagType, IService } from "@/modules/model";

export type headlineType = "h3" | "h5";
export interface IServiceGroupProps {
  headline: Pick<
    TextInputProps,
    "id" | "labelText" | "placeholder" | "helperText" | "aria-label"
  >;
  tagType?: TagType;
  services: IService[] | null;
  headlineType?: headlineType;
}
