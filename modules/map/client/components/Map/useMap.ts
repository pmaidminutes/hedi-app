import { useState, useEffect } from "react";
import { IMap } from "@/modules/map/types";
import L from "leaflet";

export function useMap(props: IMap) {
  const { locations } = props;

  const [hasLocations, setHasLocations] = useState<boolean>(
    locations && locations.length > 0
  );

  useEffect(() => {
    setHasLocations(locations && locations.length > 0);
  }, [locations])
  console.log({hasLocations})
  return { hasLocations };
}
