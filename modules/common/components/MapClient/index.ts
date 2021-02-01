import dynamic from "next/dynamic";

export const MapClient = dynamic<any>(() => import("./MapClient"), {
  ssr: false,
});
