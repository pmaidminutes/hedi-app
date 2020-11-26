import React from "react";
import { Link } from "carbon-components-react";
import { IContentEntry, IHighlightedContent } from "@/modules/search/types";

interface IProps {
  result: IContentEntry;
  highlight: IHighlightedContent;
}
export function ResultContent({ result, highlight }: IProps) {
  var content: IContentEntry = result;
  //console.log("entity", content);

  //TODO URL need to be updated here
  var url = content.site + content.search_api_id.split(/[ :]+/)[1];
  return (
    <div>
      <Link inline href={url}>
        {" "}
        <h3 style={{ margin: "30px 0 10px" }}>
          {highlight.highlightedTitle === undefined || ""
            ? content.contentTitle
            : highlight.highlightedTitle}
        </h3>
      </Link>

      {highlight.highlightedBody}
    </div>
  );
}
