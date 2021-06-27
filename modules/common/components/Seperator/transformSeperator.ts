export interface ISeperator {
  style?: "dotted" | "groove" | "double" | "dashed";
  color?: "blue" | "green" | "orange" | "pink" | "purple" | "gray";
}

export function transformSeperator(props: ISeperator) {
  const { style, color } = props;

  const initialClassName = "hedi--separator";
  let seperatorClassName = initialClassName;

  if (style) {
    seperatorClassName = `${seperatorClassName} ${initialClassName}__${style}`;
  }
  if (color) {
    seperatorClassName = `${seperatorClassName} ${initialClassName}__${color}`;
  }

  return { seperatorClassName };
}
