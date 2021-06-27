import {
  findAllHeadlineInstances,
  findLinkInstance,
  ILinkComponent,
} from "@/modules/components/types";
import { IArticleView } from "../../../types";
import { IActionBarAction } from "@/modules/editorial/types";
export interface IArticleProps {
  content: IArticleView;
}
export function transformArticle(props: IArticleProps) {
  const { content } = props;
  const {
    label,
    components,
    category,
    appStyle,
    route,
    uiComponents,
  } = content;

  const headlines = findAllHeadlineInstances(components);

  const handleShare = () => console.log("SHARE");
  const handleBookmark = () => console.log("BOOKMARK");

  const backLink = findLinkInstance(uiComponents, "backLink");

  const actions: IActionBarAction[] = [
    {
      type: "audio",
      description: "Artikel hören",
      handler: () => {},
    },
    {
      type: "share",
      description: "Teilen",
      handler: () => {},
    },
    {
      type: "print",
      description: "Drucken",
      handler: () => {},
    },
    {
      type: "language",
      description: "Sprache ändern",
      handler: () => {},
    },
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
    anchors,
    route,
    actions,
    backLink,
  };
}
