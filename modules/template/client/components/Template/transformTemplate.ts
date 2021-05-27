import {
  findBodyInstance,
  findLabelInstance,
} from "@/modules/model/components";
import { ITemplatePage } from "../../../types";
export function transformTemplate(props: ITemplatePage) {
  const { components } = props;

  const body = findBodyInstance(components, "body");
  const hint = findLabelInstance(components, "hint");

  return { body, hint };
}
