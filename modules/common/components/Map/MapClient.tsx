//import 'leaflet-defaulticon-compatibility';

import L, { LatLngExpression } from "leaflet";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const coordinates = "59.91174337077401,10.750425582038146";
export default function MapClient() {
  const position: LatLngExpression = [59.91174337077401, 10.750425582038146];
  const iconPerson = new L.Icon({
    //TODO to move thhe image to durpal
    iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [13, 0],
  });
  return (
    <div id="map">
      <MapContainer center={position} zoom={15} scrollWheelZoom={false}>
        <TileLayer
          attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={iconPerson}>
          <Popup>{coordinates}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
