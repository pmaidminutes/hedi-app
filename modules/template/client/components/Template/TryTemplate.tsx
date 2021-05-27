import { ITyped } from "@/modules/model";
import { ITemplatePage } from "../../../types"
import { Template } from "./Template";

export const TryTemplate = ({
  content,
}: {
  content: ITyped;
}): JSX.Element | null =>
  // type is declared in template/server/page/getTemplate.ts => "Template"
  content.type === "Template" ? (
    <Template content={content as ITemplatePage} />
  ) : null;
