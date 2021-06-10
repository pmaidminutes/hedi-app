import { jsonPost } from "@/modules/common/utils";
import {
  IProfessionalInput,
  IUpsertProfessionalResponse,
  upsertProfessionalAPIUrl,
} from "../../types";

export function upsertProfessional(
  input?: IProfessionalInput,
  lang?: string
): Promise<IUpsertProfessionalResponse | null> {
  return jsonPost<IUpsertProfessionalResponse>(upsertProfessionalAPIUrl, {
    input,
    lang,
  });
}
