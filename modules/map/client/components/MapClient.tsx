//import 'leaflet-defaulticon-compatibility';
// TODO: add to seperate folder
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { coordinates, Location } from "../../types";
import { convertToCoordinates } from "../functions";

// UNUSED
export default function MapClient({ locations, currentLocation }: coordinates) {
  const iconPerson = new L.Icon({
    //TODO to move thhe image to durpal
    iconUrl: process.env.NEXT_PUBLIC_MAP_MARKER_ICON,
    iconSize: [25, 41],
    iconAnchor: [13, 0],
  });

  return (
    <>
      <MapContainer
        // center={convertToCoordinates(currentLocation.lat, currentLocation.long)} HACK currently incompatible
        zoom={12}
        scrollWheelZoom={false}>
        <TileLayer
          attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
          url={process.env.NEXT_PUBLIC_MAP_OSM || ""}
        />
        {locations?.map((location: Location) => (
          <Marker
            position={location.latLong} // (location.lat, location.long) HACK currently incompatible
            icon={iconPerson}
            key={location.label}>
            <Popup>{location.label}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}
