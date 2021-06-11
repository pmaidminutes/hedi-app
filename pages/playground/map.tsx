import Head from "next/head";
import { Map } from "@/modules/map/client";
import { LatLngTuple } from "leaflet";

const latLong = [53.56565, 9.97813] as LatLngTuple;
const nico = [53.57024, 9.983] as LatLngTuple;
const nicolabel = "Nico";
const label = "aidminutes";

const nicoundnele = { label, nicolabel, latLong: nico, profession: "Hebamme" };
const location = { label: label, latLong: latLong };

const locations = [location, nicoundnele];
export default function MapPlayground() {
  return (
    <div>
      <Head>
        <title>Map</title>
      </Head>
      <h1>KARTE</h1>
      <Map locations={locations} />
    </div>
  );
}
