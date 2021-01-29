//import 'leaflet-defaulticon-compatibility';

import { ILocation } from "@/modules/profile/types";
import L, { LatLngExpression } from "leaflet";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

function convertCoordinates(
  latitude: string,
  longitude: string
): LatLngExpression {
  return [parseFloat(latitude), parseFloat(longitude)];
}
interface coordinates {
  locations: ILocation[];
  currentLocation: ILocation;
}
export default function MapClient({ locations, currentLocation }: coordinates) {
  const iconPerson = new L.Icon({
    //TODO to move thhe image to durpal
    iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [13, 0],
  });

  return (
    <div id="map">
      <MapContainer
        center={convertCoordinates(currentLocation.lat, currentLocation.long)}
        zoom={6}
        scrollWheelZoom={false}>
        <TileLayer
          attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations?.map((location: ILocation) => (
          <Marker
            position={convertCoordinates(location.lat, location.long)}
            icon={iconPerson}>
            <Popup>{location.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
