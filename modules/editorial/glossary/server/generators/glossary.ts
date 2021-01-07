import { segmentsToRoute } from "@/common/types";
import {
  getGlossary,
  getGlossaryPath,
} from "@/modules/editorial/glossary/query";
import { IGlossaryGrouped } from "@/modules/editorial/glossary/types";
import { ISegmentPath } from "@/common/types";

export const getStaticPaths = async (
  locales: string[]
): Promise<ISegmentPath[]> => {
  const paths = [];
  if (locales) {
    for (let locale of locales) {
      const glossaryPaths = await getGlossaryPath(locale);
      paths.push(...glossaryPaths);
    }
  }
  return paths;
};

export async function getStaticProps(
  segments?: string[],
  locale = "de"
): Promise<IGlossaryGrouped | null> {
  if (!segments) {
    return null;
  } else {
    return getGlossary(segmentsToRoute(segments), locale);
  }
}
