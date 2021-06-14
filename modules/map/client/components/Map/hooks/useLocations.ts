import { useState, useEffect } from "react";
import { IMapProps } from "@/modules/map/types";

export function useLocations(props: IMapProps) {
  const { locations } = props;
  const [mapLocations, setMapLocations] = useState(locations);

  const [hasLocations, setHasLocations] = useState<boolean>(
    locations && locations.length > 0
  );

  useEffect(() => {
    setHasLocations(locations && locations.length > 0);
    setMapLocations(locations)
  }, [locations,props]);

  return { hasLocations, mapLocations };
}
