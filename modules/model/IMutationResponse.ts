export interface IMutationResponse {
  success: boolean;
  errors: { [key: string]: string };
}

export const MutationResponseFields = `success
errors`;
