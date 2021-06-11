import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { IMapProps } from "../../../types";
import { useMarker, usePositions, useLocations } from "./hooks/";

export default function Map(props: IMapProps) {
  const { hasLocations, mapLocations } = useLocations(props);
  if (!hasLocations) return null;
  const { marker } = useMarker(mapLocations);
  const { firstPosition, totalBounds } = usePositions(mapLocations);

  return (
    <>
      <MapContainer
        bounds={totalBounds}
        scrollWheelZoom={false}
        center={firstPosition}>
        <TileLayer
          attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
          url={process.env.NEXT_PUBLIC_MAP_OSM || ""}
        />
        {marker.map(markerValue => {
          console.log({ markerValue });
          return (
            <Marker {...markerValue}>
              <Popup>{markerValue.key}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </>
  );
}
