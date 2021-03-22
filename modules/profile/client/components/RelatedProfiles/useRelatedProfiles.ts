import { TextInputProps } from "carbon-components-react";

export interface IRelatedProfilesProps {
  headline: Pick<
    TextInputProps,
    "id" | "labelText" | "placeholder" | "helperText" | "aria-label"
  >;
}

export function useRelatedProfiles(props: IRelatedProfilesProps) {
  const { headline } = props;

  const { labelText } = headline;

  return {
    headline: labelText as String,
  };
}
