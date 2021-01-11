import { getServiceClient, gql } from "@/modules/graphql";
import { ICategoryRoot, CategoryRootFields } from "../types";

export async function getCategoryRoot(
  lang = "de"
): Promise<ICategoryRoot | null> {
  const query = gql`
    query getCategoryRoot($lang: String, $includeSelf: Boolean) {
      categoryroot(lang: $lang) {
        ${CategoryRootFields}
      }
    }
  `;

  const client = await getServiceClient();
  return client
    .request<{ categoryroot: ICategoryRoot | null }>(query, { lang })
    .then(data => hackRootTranslationRoutes(data.categoryroot))
    .catch(e => {
      console.warn(e);
      return null;
    });
}

function hackRootTranslationRoutes(
  root: ICategoryRoot | null
): ICategoryRoot | null {
  if (!root) return root;
  root.translations = root.translations.map(t => ({ ...t, route: "/" }));
  return root;
}
