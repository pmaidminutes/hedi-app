import { IEntityLocalized, IEntityTranslated } from "@/modules/model";

// matches any route with either 2 or 2-2 char locale
export function isLandingPageRoute(route: string) {
  return route.match(/^\/[a-z]{2}(?:-[a-z]{2})?\/$/i);
}

export function fixupRoutes<T extends IEntityTranslated<IEntityLocalized>>(
  entity: T
) {
  entity.route = `/${entity.lang}/`;
  entity.translations.forEach(t => (t.route = `/${t.lang}/`));
  return entity;
}
