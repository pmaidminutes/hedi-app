export interface ICoordinatesJSON {
  items: {
    title: string;
    id: string;
    resultType: string;
    localityType: string;
    position: IGeoJSON;
  }[];
}
export interface IGeoJSON {
  lat: string;
  lng: string;
}
