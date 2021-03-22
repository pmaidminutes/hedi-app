import { TextInputProps } from "carbon-components-react";
import { ITag, TagType } from "@/modules/model";

export interface IServicesProps {
  headline: Pick<
    TextInputProps,
    "id" | "labelText" | "placeholder" | "helperText" | "aria-label"
  >;
  tags?: ITag[];
  tagType?: TagType;
}

export function useServices(props: IServicesProps) {
  const { headline, tags, tagType } = props;

  const { labelText } = headline;

  return { headline: labelText as String, tags, tagType };
}
