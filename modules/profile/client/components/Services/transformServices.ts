import { TextInputProps } from "carbon-components-react";
import { TagType, IService } from "@/modules/model";

export interface IServicesProps {
  headline: Pick<
    TextInputProps,
    "id" | "labelText" | "placeholder" | "helperText" | "aria-label"
  >;
  tagType?: TagType;
  services: IService[] | null;
  headlineType?: headlineType;
}
export type headlineType = "h3" | "h5";

export function transformServices(props: IServicesProps) {
  const { headline, services, tagType, headlineType = "h5" } = props;

  const { labelText } = headline;

  return { headline: labelText as String, services, tagType, headlineType };
}
