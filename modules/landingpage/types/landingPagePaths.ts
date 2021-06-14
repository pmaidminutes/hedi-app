import { ISegmentPath } from "@/modules/common/types";

export const landingPagePaths = [
  // HACK hard-coded instead of generating from gql
  { params: { segments: [] }, locale: "de" } as ISegmentPath,
  { params: { segments: [] }, locale: "en" } as ISegmentPath,
  { params: { segments: [] }, locale: "fa" } as ISegmentPath,
];
