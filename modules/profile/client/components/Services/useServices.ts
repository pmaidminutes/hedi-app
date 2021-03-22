import { TextInputProps } from "carbon-components-react";
import { TagType, IService } from "@/modules/model";

export interface IServicesProps {
  headline: Pick<
    TextInputProps,
    "id" | "labelText" | "placeholder" | "helperText" | "aria-label"
  >;
  tagType?: TagType;
  services: IService[] | null;
}

export function useServices(props: IServicesProps) {
  const { headline, services, tagType } = props;

  const { labelText } = headline;

  return { headline: labelText as String, services, tagType };
}
