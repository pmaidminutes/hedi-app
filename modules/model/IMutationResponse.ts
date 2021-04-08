import { StringProperties } from ".";

export interface IMutationResponse {
  success: boolean;
  errors: StringProperties;
}

export const MutationResponseFields = `success
errors`;
