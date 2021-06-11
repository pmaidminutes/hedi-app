import { latLngBounds } from "leaflet";
import { Location } from "../../../../types";

import { useState, useMemo, useEffect } from "react";

export function usePositions(locations: Location[]) {
  const [selectedPosition, setSelectedPosition] = useState<Location | null>(
    null
  );
  const [positions, setPositions] = useState(
    locations.map(location => location.latLong)
  );
  const firstPosition = positions[0];
  const [markerLocations, setMarkerLocations] = useState(null);

  useEffect(() => {
    setPositions(locations.map(location => location.latLong));
  }, [locations]);

  const totalBounds = useMemo(() => {
    // @ts-ignore
    const bounds = latLngBounds();
    positions.forEach(pos => bounds.extend(pos));
    return bounds.pad(0.1);
  }, [positions]);

  const handlePositionClick = (position: Location) => () =>
    setSelectedPosition(position);

  return { totalBounds, firstPosition, positions, handlePositionClick };
}
