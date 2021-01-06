import { segmentsToRoute } from "@/common/types";
import {
  getGlossary,
  getGlossaryPath,
} from "@/modules/editorial/glossary/query";

export const getStaticPaths = async (locales: string[]) => {
  const paths = [];
  if (locales) {
    for (let locale of locales) {
      const glossaryPaths = await getGlossaryPath(locale);
      paths.push(...glossaryPaths);
    }
  }
  return paths;
};

export async function getStaticProps(segments?: string[], locale = "de") {
  if (!segments) {
    return null;
  } else {
    return getGlossary(segmentsToRoute(segments), locale);
  }
}
