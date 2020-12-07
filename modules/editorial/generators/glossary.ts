import { getGlossaryPaths } from "../glossaries";
import { IGlossaryPaths } from "../types";

export const getAllGlossaryPaths = async (locales: string[]) => {
  const paths: IGlossaryPaths[] = [];
  if (locales) {
    for (let locale of locales) {
      const glossaryPaths = await getGlossaryPaths(locale);
      paths.push(...glossaryPaths);
    }
  }
  return paths;
};
