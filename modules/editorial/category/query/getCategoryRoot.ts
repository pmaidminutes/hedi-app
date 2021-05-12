import { logAndNull } from "@/modules/common/error";
import { gql, serviceGQuery } from "@/modules/graphql";
import { ICategoryRoot, CategoryRootGQL } from "../types";

export async function getCategoryRoot(
  lang = "de"
): Promise<ICategoryRoot | null> {
  const query = gql`
    query getCategoryRoot($lang: String, $includeSelf: Boolean) {
      categoryroot(lang: $lang) {
        ${CategoryRootGQL}
      }
    }
  `;

  return serviceGQuery<{ categoryroot: ICategoryRoot | null }>(query, {
    lang,
  }).then(data => hackRootTranslationRoutes(logAndNull(data)?.categoryroot));
}

function hackRootTranslationRoutes(
  root?: ICategoryRoot | null
): ICategoryRoot | null {
  if (!root) return null;
  root.translations = root.translations.map(t => ({ ...t, route: "/" }));
  return root;
}
