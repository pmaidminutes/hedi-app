export const requiredValidationFn = <T>() => {
  return (value: T) => !!value;
};
export const minLengthValidationFn = <T>(minLength: number) => {
  return (value: T) => new Object(value ?? "").toString().length >= minLength;
};
export const maxLengthValidationFn = <T>(maxLength: number) => {
  return (value: T) => new Object(value ?? "").toString().length <= maxLength;
};

export const regexValidationFn = <T>(regex: RegExp) => {
  return (value: T) => regex.test(new Object(value ?? "").toString());
};
