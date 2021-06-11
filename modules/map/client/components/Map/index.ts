import dynamic from "next/dynamic";

export const Map = dynamic<any>(() => import("./Map"), {
  ssr: false,
});
