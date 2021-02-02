//import 'leaflet-defaulticon-compatibility';

import { Location } from "@/modules/profile/types";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

function convertToCoordinates(
  latitude: string,
  longitude: string
): LatLngExpression {
  return [parseFloat(latitude), parseFloat(longitude)];
}
interface coordinates {
  locations: Location[];
  currentLocation: Location;
}
export default function MapClient({ locations, currentLocation }: coordinates) {
  const iconPerson = new L.Icon({
    //TODO to move thhe image to durpal
    iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [13, 0],
  });

  return (
    <>
      <MapContainer
        center={convertToCoordinates(currentLocation.lat, currentLocation.long)}
        zoom={12}
        scrollWheelZoom={false}>
        <TileLayer
          attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations?.map((location: Location) => (
          <Marker
            position={convertToCoordinates(location.lat, location.long)}
            icon={iconPerson}>
            <Popup>{location.displayName}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}
