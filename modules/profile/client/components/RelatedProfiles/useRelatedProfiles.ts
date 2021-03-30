import { TextInputProps } from "carbon-components-react";

export interface IRelatedProfilesProps {
  headline: Pick<
    TextInputProps,
    "id" | "labelText" | "placeholder" | "helperText" | "aria-label"
  >;
  // TODO more specific
  profiles?: any[];
}

export function useRelatedProfiles(props: IRelatedProfilesProps) {
  const { headline, profiles } = props;

  const { labelText } = headline;

  return {
    headline: labelText as String,
    profiles,
  };
}
