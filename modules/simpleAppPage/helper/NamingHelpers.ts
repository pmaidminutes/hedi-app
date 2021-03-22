export const capitalizeFirstLetter = (key: string) => {
  if (!key) return key;
  return key[0].toUpperCase() + key.substr(1);
};
