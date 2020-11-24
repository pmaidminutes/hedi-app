export const csrfObject = (csrfToken: string) => {
  return { "X-CSRF-Token": csrfToken };
};

export const bearerObject = (accessToken: string) => {
  return { Authorization: "Bearer " + accessToken };
};

export interface IAuthHeader extends Record<string, string> {
  Authorization: string;
  "X-CSRF-Token": string;
}

export const authHeader = (args: {
  accessToken: string;
  csrfToken: string;
}) => {
  return {
    ...bearerObject(args.accessToken),
    ...csrfObject(args.csrfToken),
  } as IAuthHeader;
};

export const oauthNow = () => Math.floor(Date.now() / 1000);

export const expiryObject = (expiresIn: number) => {
  const iat = oauthNow();
  const exp = iat + expiresIn;
  return { iat, exp };
};
