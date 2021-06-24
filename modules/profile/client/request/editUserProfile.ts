import { jsonPost } from "@/modules/common/utils";
import {
  IUpsertProfileResponse,
  IUserProfileInput,
  IUpsertProfessionalResponse,
  upsertProfessionalAPIUrl,
  ProfessionalInputDefault,
  professionalToInput,
  IUpsertPersonalResponse,
  upsertPersonalAPIUrl,
  PersonalInputDefault,
  personalToInput,
} from "../../types";

export type IEditUserProfileResponse = IUpsertProfileResponse<IUserProfileInput>;

export function editUserProfile(
  input?: IUserProfileInput,
  lang?: string
): Promise<IEditUserProfileResponse> {
  // TODO unstable! input might be null due to initial request or no changes, cannot just assume personal
  if (input && "profession" in input) {
    return jsonPost<IUpsertProfessionalResponse>(upsertProfessionalAPIUrl, {
      input,
      lang,
    })
      .catch(e => {
        console.error(e);
        return null;
      })
      .then(resolveProfessionalResponse);
  } else {
    return jsonPost<IUpsertPersonalResponse>(upsertPersonalAPIUrl, {
      input,
      lang,
    })
      .catch(e => {
        console.error(e);
        return null;
      })
      .then(resolvePersonalResponse);
  }
}

function resolvePersonalResponse(data: IUpsertPersonalResponse | null) {
  if (!data)
    return {
      success: false,
      profile: PersonalInputDefault,
    } as IEditUserProfileResponse;
  else if (!data.profile)
    return {
      ...data,
      profile: PersonalInputDefault,
    } as IEditUserProfileResponse;
  else {
    const { profile, ...rest } = data;
    return {
      profile: personalToInput(profile),
      ...rest,
    };
  }
}

function resolveProfessionalResponse(data: IUpsertProfessionalResponse | null) {
  if (!data)
    return {
      success: false,
      profile: ProfessionalInputDefault,
    } as IEditUserProfileResponse;
  else if (!data.profile)
    return {
      ...data,
      profile: ProfessionalInputDefault,
    } as IEditUserProfileResponse;
  else {
    const { profile, ...rest } = data;
    return {
      profile: professionalToInput(profile),
      ...rest,
    };
  }
}
