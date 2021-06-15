import {
  findBodyInstance,
  findLabelInstance,
  findSelectInstance,
} from "@/modules/components/types";
import { ITemplatePage } from "../../../types";
export function transformTemplate(props: ITemplatePage) {
  const { components } = props;

  const body = findBodyInstance(components, "body");
  const hint = findLabelInstance(components, "hint");
  const fuzzy = findSelectInstance(components, "fuzzy");

  


  return { body, hint, fuzzy };
}
