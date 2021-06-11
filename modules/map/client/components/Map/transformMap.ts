import { useState, useEffect } from "react";
import { IMap } from "@/modules/map/types";
import L from "leaflet";

export function transformMap(props: IMap) {
  const { locations } = props;

  const [hasLocations, setHasLocations] = useState<boolean>(
    locations.length > 1
  );
  

  const firstLocation = locations[0];


  useEffect(() => {
    setHasLocations(locations.length > 1);
  }, [locations]);

  const iconPerson = new L.Icon({
    //TODO to move thhe image to durpal
    iconUrl: process.env.NEXT_PUBLIC_MAP_MARKER_ICON,
    iconSize: [25, 41],
    iconAnchor: [13, 0],
  });

  const markerValues = locations.map(location => {
    return {
      position: location.latLong,
      icon: iconPerson,
      key: location.label,
    };
  });

  return { firstLocation, locations, markerValues };
}
