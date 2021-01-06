export const oauthNow = () => Math.floor(Date.now() / 1000);

export const expiryObject = (expiresIn: number) => {
  const iat = oauthNow();
  const exp = iat + expiresIn;
  return { iat, exp };
};
