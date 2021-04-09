export interface IRelatedProfile {
  longtitle: string;
  description: string;
  city: string;
  route: string;
  placeholder?: string;
  helperText?: string;
  labelText?: string;
}
export function transformRelatedProfile(props: IRelatedProfile) {
  // HACK
  const {
    longtitle,
    description,
    city,
    route,
    helperText,
    placeholder,
    labelText,
  } = props;
  return {
    longtitle: labelText ? labelText : longtitle,
    description: placeholder ? placeholder : description,
    city: helperText ? helperText : city,
    route,
  };
}
