import {
  getGlossaryBySlug,
  getGlossaryPaths,
} from "@/modules/editorial/glossaries";

export const getStaticPaths = async (locales: string[]) => {
  const paths = [];
  if (locales) {
    for (let locale of locales) {
      const glossaryPaths = await getGlossaryPaths(locale);
      paths.push(...glossaryPaths);
    }
  }
  return paths;
};

export async function getStaticProps(segments?: string[], locale = "de") {
  if (!segments) {
    return null;
  } else {
    return getGlossaryBySlug(segments[segments.length - 1], locale);
  }
}
