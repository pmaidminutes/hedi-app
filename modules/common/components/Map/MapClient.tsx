//import 'leaflet-defaulticon-compatibility';

import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const coordinates = "51.49037,9.762";
export default function MapClient() {
  return (
    <MapContainer
      center={[
        parseFloat(coordinates.split(",")[0]),
        parseFloat(coordinates.split(",")[1]),
      ]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ width: "50%", height: "50%" }}>
      <TileLayer
        attribution={
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={[
          parseFloat(coordinates.split(",")[0]),
          parseFloat(coordinates.split(",")[1]),
        ]}>
        <Popup>{coordinates}</Popup>
      </Marker>
    </MapContainer>
  );
}
