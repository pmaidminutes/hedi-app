import { ILinkComponent } from "@/modules/components/types";
import { IArticleAction } from "../../../types";
export interface IAside {
  actions?: IArticleAction[];
  anchors?: ILinkComponent[];
}
export function transformAside(props: IAside) {
  const { anchors, actions } = props;

  return { anchors: anchors ?? null, actions: actions ?? null };
}
