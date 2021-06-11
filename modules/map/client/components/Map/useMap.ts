import { useState, useEffect } from "react";
import { IMap } from "@/modules/map/types";

export function useMap(props: IMap) {
  const { locations } = props;

  const [hasLocations, setHasLocations] = useState<boolean>(
    locations && locations.length > 0
  );

  useEffect(() => {
    setHasLocations(locations && locations.length > 0);
  }, [locations])
  return { hasLocations };
}
