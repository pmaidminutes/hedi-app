import { ITyped } from "@/modules/model";
import { IGlossaryGrouped } from "../../../types";
import { Glossary } from "./Glossary";

export const TryGlossary = ({
  content,
}: {
  content: ITyped;
}): JSX.Element | null =>
  content.type === "Glossary" ? (
    <Glossary content={content as IGlossaryGrouped} />
  ) : null;
