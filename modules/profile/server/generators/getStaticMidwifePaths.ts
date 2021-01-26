import { ISegmentPath } from "@/modules/editorial/types";
import { getMidwifePaths } from "../../query";

export const getStaticPaths = async (): Promise<ISegmentPath[]> => {
  const paths: ISegmentPath[] = [];
  const segments = await getMidwifePaths();
  if (segments) paths.push(...segments);

  return paths;
};
