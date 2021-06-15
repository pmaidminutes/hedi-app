import { ITyped } from "@/modules/model";
import { IGlossaryViewDefinition } from "../../../types";
import { Glossary } from "..";

export const TryGlossary = ({
  content,
}: {
  content: ITyped;
}): JSX.Element | null =>
  content.type === "Glossary" ? (
    <Glossary props={content as IGlossaryViewDefinition} />
  ) : null;
