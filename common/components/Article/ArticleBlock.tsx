import { IContentEntry, IHighlightedContent } from "@/modules/search/types";
import React from "react";

interface IProps {
  result: IContentEntry;
  highlight: IHighlightedContent;
}
export function ArticleBlock({ result, highlight }: IProps) {
  var content: IContentEntry = result;

  //TODO URL need to be updated here
  var url = "#";
  return (
    <div className="bx--col-sm-4 bx--col-md-6 bx--col-lg-10">
      <a
        href={url}
        className="bx--tile bx--tile--clickable hedi-unstyled-link hedi-article-entry-search">
        <h4 className="pb-s-sm">
          {highlight.highlightedTitle === undefined || ""
            ? content.contentTitle
            : highlight.highlightedTitle}
        </h4>
        <p> {highlight.highlightedBody} </p>
      </a>
    </div>
  );
}
