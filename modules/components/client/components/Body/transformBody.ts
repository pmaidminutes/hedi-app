import { IBodyComponent } from "../../../types";

export interface IBodyProps extends IBodyComponent {}

export function transformBody(props: IBodyProps) {
  const { body, ...rest } = props;

  return { body, rest };
}
