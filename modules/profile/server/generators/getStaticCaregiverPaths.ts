import { ISegmentPath } from "@/modules/editorial/types";
import { getCaregiverPaths } from "../../query";

export const getStaticPaths = async (): Promise<ISegmentPath[]> => {
  const paths = [];

  const segments = await getCaregiverPaths();
  if (segments) paths.push(...segments);

  return paths;
};
