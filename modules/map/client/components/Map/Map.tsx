import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { IMapProps } from "../../../types";
import { useMarker, usePositions, useLocations } from "./hooks/";
import { useState, useEffect } from "react";

export default function Map(props: IMapProps) {
  const { hasLocations, mapLocations } = useLocations(props);
  if (!hasLocations) return null;
  const { marker } = useMarker(mapLocations);
  const { firstPosition, mapBounds } = usePositions(mapLocations);
  const [center, setCenter] = useState(mapBounds);

  useEffect(() => {
    setCenter(mapBounds);
  }, [mapBounds]);


  // TODO automatic zoom to right bound, when number of location change
  // TODO zoom in on marker, when clicked

  return (
    <>
      <MapContainer
        bounds={center}
        scrollWheelZoom={false}
        center={firstPosition}>
        <TileLayer
          attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
          url={process.env.NEXT_PUBLIC_MAP_OSM || ""}
        />
        {marker.map(markerValue => {
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
