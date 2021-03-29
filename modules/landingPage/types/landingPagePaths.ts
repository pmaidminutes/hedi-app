import { ISegmentPath } from "@/modules/common/types";

export const landingPagePaths = [
  // HACK hard-coded instead of generating from gql
  { params: { segments: ["de"] }, locale: "de" } as ISegmentPath,
  { params: { segments: ["en"] }, locale: "en" } as ISegmentPath,
  { params: { segments: [] }, locale: "de" } as ISegmentPath,
  { params: { segments: [] }, locale: "en" } as ISegmentPath,
];
