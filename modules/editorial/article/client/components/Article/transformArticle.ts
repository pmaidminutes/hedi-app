import {
  findAllHeadlineInstances,
  ILinkComponent,
} from "@/modules/components/types";
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
    {
      type: "copylink",
      description: "Link kopieren",
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
  };
}
