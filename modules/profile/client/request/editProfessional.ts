import { jsonPost } from "@/modules/common/utils";
import {
  IProfessionalInput,
  IUpsertProfessionalResponse,
  ProfessionalInputDefault,
  professionalToInput,
  upsertProfessionalAPIUrl,
} from "../../types";

export type IEditProfessionalResponse = Omit<
  IUpsertProfessionalResponse,
  "profile"
> & {
  profile?: IProfessionalInput;
};

export function editProfessional(
  input?: IProfessionalInput,
  lang?: string
): Promise<IEditProfessionalResponse> {
  return jsonPost<IUpsertProfessionalResponse>(upsertProfessionalAPIUrl, {
    input,
    lang,
  })
    .catch(e => {
      console.error(e);
      return null;
    })
    .then(data => {
      if (!data)
        return {
          success: false,
          profile: ProfessionalInputDefault,
        } as IEditProfessionalResponse;
      else if (!data.profile)
        return {
          ...data,
          profile: ProfessionalInputDefault,
        } as IEditProfessionalResponse;
      else {
        const { profile, ...rest } = data;
        return {
          profile: professionalToInput(profile),
          ...rest,
        };
      }
    });
}
