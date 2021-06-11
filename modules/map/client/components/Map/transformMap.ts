import { IMap } from "@/modules/map/types";
import L, { PointTuple } from "leaflet";

export function transformMap(props: IMap) {
  const { locations } = props;
  const firstLocation = locations[0];

  const markerValues = locations.map(location => {
    return {
      position: location.latLong,
      icon: getIcon(location.profession),
      key: location.label,
    };
  });

  return { firstLocation, locations, markerValues };
}

function getIcon(profession?: "Hebamme") {
  let url = process.env.NEXT_PUBLIC_MAP_MARKER_ICON;
  let iconSize: PointTuple = [25, 41];
  if (profession && profession === "Hebamme") {
    url = "/dummy/images/hebamme.png";
    iconSize = [32, 32];
  }
  return new L.Icon({
    //TODO to move thhe image to durpal
    iconUrl: url,
    // iconUrl: process.env.NEXT_PUBLIC_MAP_MARKER_ICON,
    iconSize: iconSize,
    iconAnchor: [13, 0],
  });
}
