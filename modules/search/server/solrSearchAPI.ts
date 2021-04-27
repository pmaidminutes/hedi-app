import { IErrorResponse, IsIHTTPError } from "@/modules/common/error";
import { getArticle } from "@/modules/editorial/article/query";
import { IArticle } from "@/modules/editorial/article/types";
import { getCategory } from "@/modules/editorial/category/query";
import { ICategory } from "@/modules/editorial/category/types";
import { getGlossaryTerm } from "@/modules/editorial/glossary/query";
import { IGlossaryTerm } from "@/modules/editorial/glossary/types";
import { parseJSONToLatLngCoordinates } from "@/modules/map/server/functions";
import { requestCoordinates } from "@/modules/map/server/request";
import {
  getCaregiver,
  getInstitution,
  getMidwife,
  getOrganisation,
} from "@/modules/profile/query";
import {
  ICaregiver,
  IInstitution,
  IMidwife,
  IOrganisation,
} from "@/modules/profile/types";
import { searchServer } from "./request";
import { NextApiHandler } from "next";
import { sendAPIHttpError, sendAPISuccess } from "@/modules/common/utils";
import { getAppPage } from "@/modules/apppage/query";
import { IAppPage } from "@/modules/common/types";

export const solrSearchAPI: NextApiHandler<
  | IErrorResponse
  | (
      | IArticle
      | ICategory
      | IGlossaryTerm
      | ICaregiver
      | IMidwife
      | IOrganisation
      | IInstitution
      | IAppPage
    )[]
> = async (req, res) => {
  const {
    query: { lang, searchText, filter, location, distance },
  } = req;
  const locationJson = await requestCoordinates(`${location}`);
  const locationCoordinates = parseJSONToLatLngCoordinates(locationJson);
  const data = await searchServer(
    `${lang}`,
    `${searchText}`.split(" ").join(" || "),
    `${filter}`,
    locationCoordinates,
    `${distance}`,
    true
  );

  if (IsIHTTPError(data)) sendAPIHttpError(res, data);
  else {
    const promises = [];
    for (const entry of data) {
      const highlight = entry.highlightedContent;
      const highlightedBody = Array.isArray(highlight.highlightedBody)
        ? highlight.highlightedBody.join("...")
        : highlight.highlightedBody;
      const [_, path, lang] = entry.search_api_id.split(":");
      const route = "/" + path.replace("taxonomy_term", "taxonomy/term");
      switch (entry.ss_type) {
        case "article":
          promises.push(
            getArticle(route).then(article => {
              if (article) {
                article.label = highlight.highlightedTitle ?? article.label;
                article.summary = highlightedBody;
              }
              return article;
            })
          );
          break;
        case "app_page":
          promises.push(
            getAppPage(route).then(page => {
              if (page) {
                page.label = highlight.highlightedTitle ?? page.label;
                page.body = highlightedBody;
              }
              return page;
            })
          );
          break;
        case "categories":
          promises.push(
            getCategory(route).then(category => {
              if (category)
                category.label = highlight.highlightedTitle ?? category.label;
              return category;
            })
          );
          break;
        case "glossaryterm":
          promises.push(
            getGlossaryTerm(route).then(glossary => {
              if (glossary) {
                glossary.label = highlight.highlightedTitle ?? glossary.label;
                glossary.body = highlightedBody ?? glossary.body;
              }
              return glossary;
            })
          );
          break;
        case "caregiver_tmp":
          promises.push(
            getCaregiver(route).then(caregiver => {
              if (caregiver) {
                caregiver.label = highlight.highlightedTitle ?? caregiver.label;
              }
              return caregiver;
            })
          );
          break;
        case "midwife_tmp":
          promises.push(
            getMidwife(route).then(midwife => {
              if (midwife) {
                midwife.label = highlight.highlightedTitle ?? midwife.label;
              }
              return midwife;
            })
          );
          break;
        case "organisation_tmp":
          promises.push(
            getOrganisation(route).then(organisation => {
              if (organisation) {
                organisation.label =
                  highlight.highlightedTitle ?? organisation.label;
              }
              return organisation;
            })
          );
          break;
        case "institution_tmp":
          promises.push(
            getInstitution(route).then(institution => {
              if (institution) {
                institution.label =
                  highlight.highlightedTitle ?? institution.label;
              }
              return institution;
            })
          );
          break;
      }
    }
    const entries = await Promise.all<
      | IArticle
      | ICategory
      | IGlossaryTerm
      | ICaregiver
      | IMidwife
      | IOrganisation
      | IInstitution
      | IAppPage
      | null
    >(promises);
    const nonNull = entries.filter(entry => entry) as (
      | IArticle
      | ICategory
      | IGlossaryTerm
      | ICaregiver
      | IMidwife
      | IOrganisation
      | IInstitution
      | IAppPage
    )[];
    sendAPISuccess(res, nonNull);
  }
};
export default solrSearchAPI;
