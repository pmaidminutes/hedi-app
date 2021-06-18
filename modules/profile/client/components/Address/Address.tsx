import { IAddress } from "../../../types/dataTypes";

export const Address = (
  props: Partial<IAddress> & React.HTMLAttributes<HTMLElement>
) => {
  const {
    dataKind,
    city,
    postalCode,
    dataVisibility,
    latLongApprox,
    street,
    streetNumber,
    additionalInfo,
    latLong,
    detailsVisibility,
    ...rest
  } = props;
  // TODO dataKind
  return (
    <address {...rest}>
      {postalCode} {city}
      {(street || streetNumber || additionalInfo) && <br />}
      {street} {streetNumber} {additionalInfo}
    </address>
  );
};
