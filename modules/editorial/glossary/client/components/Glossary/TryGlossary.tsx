import { ITyped } from "@/modules/model";
import { IGlossary, IGlossaryGroup } from "../../../types";
import { Glossary } from "./Glossary";

export const TryGlossary = ({
  content,
}: {
  content: ITyped;
}): JSX.Element | null =>
  content.type === "Glossary" ? (
    <Glossary props={content as IGlossaryGroup} />
  ) : null;
