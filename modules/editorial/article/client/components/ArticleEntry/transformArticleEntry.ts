import { IBreadCrumbProps } from "@/modules/shell/client/components/BreadCrumb/transformBreadCrumb";
import { IArticleEntry } from "../../../types";
import { EntryType } from "../ArticleEntryList";

export interface IArticleEntryProps extends IArticleEntry {
  entryType: EntryType;
}

export function transformArticleEntry(props: IArticleEntryProps) {
  const {
    label,
    route,
    routelabel,
    appStyle,
    lang,
    type,
    summary,
    image,
    entryType,
  } = props;

  const breadcrumbData: IBreadCrumbProps = {
    label,
    routelabel,
    lang,
    route,
    type,
    appStyle,
    breadcrumbType:
      entryType === "normal-neighbours" ? "graphical" : "withoutTitle",
  };

  const gridClass =
    image !== undefined ? "hedi--article-entry__grid" : undefined;

  const entryClass = `hedi--article-entry${
    entryType === "full" ? " hedi--article-entry--full" : ""
  }`;

  const textwrapClass = `hedi--article-entry__grid--content__text-wrap${
    entryType === "full"
      ? " hedi--article-entry__grid--content__text-wrap--full"
      : ""
  }`;

  return {
    label,
    breadcrumbData,
    summary,
    image,
    route,
    background: image?.color || "transparent",
    gridClass,
    entryType,
    entryClass,
    textwrapClass,
  };
}
