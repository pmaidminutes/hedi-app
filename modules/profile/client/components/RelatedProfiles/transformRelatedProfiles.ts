import { TextInputProps } from "carbon-components-react";
import { IRelatedProfilesProps } from ".";

export function transformRelatedProfiles(props: IRelatedProfilesProps) {
  const { headline, profiles } = props;

  const { labelText } = headline;

  return {
    headline: labelText as String,
    profiles,
  };
}
