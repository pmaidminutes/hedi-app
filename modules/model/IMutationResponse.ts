import { ErrorMap } from ".";

export interface IMutationResponse {
  success: boolean;
  errors?: ErrorMap;
}

export const MutationResponseFields = `success
errors`;
