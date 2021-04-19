export const requiredValidationFn = <T extends object>(value: T) => !!value;

export const minLengthValidationFn = (minLength: number) => {
  return (value: string) => value.length >= minLength;
};
export const maxLengthValidationFn = (maxLength: number) => {
  return (value: string) => value.length <= maxLength;
};

export const regexValidationFn = (regex: RegExp) => {
  return (value: string) => regex.test(value);
};
