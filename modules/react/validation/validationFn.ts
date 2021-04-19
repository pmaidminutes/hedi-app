export const requiredValidationFn = (value: string) => !!value;

export const minLengthValidationFn = (minLength: number) => {
  return (value: string) => value.length >= minLength;
};
export const maxLengthValidationFn = (maxLength: number) => {
  return (value: string) => value.length <= maxLength;
};
