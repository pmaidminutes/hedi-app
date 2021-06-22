import {
  findAllHeadlineInstances,
  ILinkComponent,
} from "@/modules/components/types";
import { Bookmark24, Share24 } from "@carbon/icons-react";
import { IArticle, IArticleAction } from "../../../types";

export interface IArticleProps {
  content: IArticle;
}
export function transformArticle(props: IArticleProps) {
  const { content } = props;
  const { label, components, category, appStyle, route } = content;

  const headlines = findAllHeadlineInstances(components);

  const handleShare = () => console.log("SHARE");
  const handleBookmark = () => console.log("BOOKMARK");

  const actions: IArticleAction[] = [
    { icon: Share24, description: "Teilen", handler: handleShare },
    { icon: Bookmark24, description: "Speichern", handler: handleBookmark },
  ];

  // TODO hier die links bauen
  const anchors: ILinkComponent[] = headlines.map(headline => {
    return {
      kind: "Link",
      href: `${route}#${headline.id || "id"}`,
      labelText: headline?.text || "kein Text",
    };
  });

  return {
    headline: label,
    components,
    headlines,
    actions,
    anchors,
    route,
  };
}
