import Head from "next/head";
import { Map } from "@/modules/map/client";
import { LatLngTuple } from "leaflet";
const umg = {
  label: "UMG",
  latLong: stringToLatLangTuple("51.536783,9.925897"),
};
const kiel = {
  label: "aidminutes Kiel",
  latLong: stringToLatLangTuple("54.337130,10.144460"),
};
const hamburg = {
  label: "aidminutes Hamburg",
  latLong: stringToLatLangTuple("53.56565, 9.97813"),
  profession: "Hebamme",
};
const buchholz = {
  label: "aidminutes Buchholz",
  latLong: stringToLatLangTuple("53.317697, 9.869485"),
};
const locations = [hamburg, kiel, buchholz, umg];
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

function stringToLatLangTuple(value: string): LatLngTuple {
  const values = value.split(",");
  return [parseFloat(values[0]), parseFloat(values[1])] as LatLngTuple;
}
