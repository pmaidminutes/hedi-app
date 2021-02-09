import { LatLngExpression } from "leaflet";

export function convertToCoordinates(
  latitude: string,
  longitude: string
): LatLngExpression {
  return [parseFloat(latitude), parseFloat(longitude)];
}
