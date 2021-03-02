import { segmentsToRoute } from "@/modules/common/utils";
import { getGlossary } from "../../query";
import { IGlossaryGrouped } from "../../types";

export async function getStaticProps(
  segments?: string[],
  locale = "de"
): Promise<IGlossaryGrouped | null> {
  if (!segments) {
    return null;
  } else {
    return getGlossary(segmentsToRoute(segments, locale), locale);
  }
}
