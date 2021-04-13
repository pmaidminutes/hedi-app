import { IServicesProps } from ".";

export function transformServices(props: IServicesProps) {
  const { headline, services, tagType, headlineType = "h5" } = props;

  const { labelText } = headline;

  return { headline: labelText as String, services, tagType, headlineType };
}
