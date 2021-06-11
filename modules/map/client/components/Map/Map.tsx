//import 'leaflet-defaulticon-compatibility'
import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { IMap } from "../../../types";
import { useMap } from "./useMap";
import {transformMap} from "./transformMap"


export default function Map(props: IMap) {
  const { hasLocations } = useMap(props);
  if (!hasLocations) return null;
  const {firstLocation, markerValues} = transformMap(props)
  return (
    <>
      <MapContainer
        zoom={13}
        scrollWheelZoom={false}
        center={firstLocation.latLong}>
        <TileLayer
          attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
          url={process.env.NEXT_PUBLIC_MAP_OSM || ""}
        />
        {markerValues.map(markerValue => (
          <Marker {...markerValue}>{/* <Popup>{}</Popup> */}</Marker>
        ))}
      </MapContainer>
    </>
  );
}
