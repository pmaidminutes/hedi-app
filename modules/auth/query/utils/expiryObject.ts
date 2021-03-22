export const getIAT = (now: number) => Math.floor(now / 1000);

export const getAccessTokenExpires = (now: number, expiresIn: number) =>
  now + expiresIn * 1000;

export const getExpires = (expiresIn: number) => {
  const now = Date.now();
  const iat = getIAT(now);
  const accessTokenExpires = getAccessTokenExpires(now, expiresIn);
  return {
    accessTokenExpires,
    expires: expiresIn,
    iat,
    exp: 0,
  };
};
