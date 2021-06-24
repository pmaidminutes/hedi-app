import { jsonPost } from "@/modules/common/utils";
import {
  IOrganisationInput,
  IUpsertOrganisationResponse as IUpsertOrganisationServerResponse,
  OrganisationInputDefault,
  organisationToInput,
  upsertOrganisationAPIUrl,
} from "../../types";

export type IUpsertOrganisationResponse = Omit<
  IUpsertOrganisationServerResponse,
  "profile"
> & {
  profile?: IOrganisationInput;
};

export function upsertOrganisation(
  input?: IOrganisationInput,
  route?: string,
  lang?: string
): Promise<IUpsertOrganisationResponse> {
  return jsonPost<IUpsertOrganisationServerResponse>(upsertOrganisationAPIUrl, {
    input,
    route,
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
          profile: OrganisationInputDefault,
        } as IUpsertOrganisationResponse;
      else if (!data.profile)
        return {
          ...data,
          profile: OrganisationInputDefault,
        } as IUpsertOrganisationResponse;
      else {
        const { profile, ...rest } = data;
        return {
          profile: organisationToInput(profile),
          ...rest,
        };
      }
    });
}
