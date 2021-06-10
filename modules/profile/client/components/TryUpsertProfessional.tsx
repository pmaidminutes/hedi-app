import { ITyped } from "@/modules/model";
import { IPage } from "@/modules/page/types";
import { UpsertProfessionalView } from "./UpsertProfessional";

export const TryUpsertProfessional = ({
  content,
}: {
  content: ITyped;
}): JSX.Element | null =>
  content.type === "UpsertProfessional" ? (
    <UpsertProfessionalView content={content as IPage} />
  ) : null;
