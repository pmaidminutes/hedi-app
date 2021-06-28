import {
  findAllHeadlineInstances,
  findGroupInstance,
  findLabelInstance,
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
  const backLink = findLinkInstance(uiComponents, "backLink");
  const actionBar = findGroupInstance(uiComponents, "actionbar");

  let audio,
    share,
    print,
    language = undefined;

  if (actionBar?.components) {
    audio = findLabelInstance(actionBar.components, "audio");
    share = findLabelInstance(actionBar.components, "share");
    print = findLabelInstance(actionBar.components, "print");
    language = findLabelInstance(actionBar.components, "language");
  }

  const actions: IActionBarAction[] = [];
  if (audio)
    actions.push({
      type: "audio",
      description: audio.text || "",
      handler: () => {},
    });
  if (share)
    actions.push({
      type: "share",
      description: share.text || "",
      handler: () => {},
    });
  if (print)
    actions.push({
      type: "print",
      description: print.text || "",
      handler: () => {},
    });
  if (language)
    actions.push({
      type: "language",
      description: language.text || "",
      handler: () => {},
    });

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
