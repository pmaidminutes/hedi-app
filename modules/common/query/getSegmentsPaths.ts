import { gql, serviceGQuery } from "@/modules/graphql";
import { IEntityLocalized } from "@/modules/model";
import { routeToSegments } from "../utils";
import { ISegmentPath } from "../types";
import { logAndNull } from "../error";

export async function getSegmentsPaths(
  gqlQueries: string[],
  lang: string
): Promise<ISegmentPath[]> {
  const query = gql`
  query getSegmentsPaths($lang: String) {
    ${gqlQueries.join("\n")}
  }`;

  return serviceGQuery<Record<string, IEntityLocalized[]>>(query, {
    lang,
  }).then(data =>
    !logAndNull(data)
      ? []
      : Object.values(data).flatMap(ets =>
          (Array.isArray(ets) ? ets : [ets])
            .filter(e => e.lang === lang)
            .map(e => ({
              params: { segments: routeToSegments(e.route) },
              locale: e.lang,
            }))
        )
  );
}
