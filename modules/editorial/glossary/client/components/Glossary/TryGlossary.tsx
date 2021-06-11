import { ITyped } from "@/modules/model";
import { IGlossary } from "../../../types";
import { Glossary } from "./Glossary";

export const TryGlossary = ({
  content,
}: {
  content: ITyped;
}): JSX.Element | null =>
  content.type === "glossary" ? (
    <Glossary content={content as IGlossary} />
  ) : null;
