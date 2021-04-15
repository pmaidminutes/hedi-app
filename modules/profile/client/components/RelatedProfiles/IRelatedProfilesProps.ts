import { TextInputProps } from "carbon-components-react";

export interface IRelatedProfilesProps {
  headline: Pick<
    TextInputProps,
    "id" | "labelText" | "placeholder" | "helperText" | "aria-label"
  >;
  // TODO more specific
  profiles?: any[];
}
