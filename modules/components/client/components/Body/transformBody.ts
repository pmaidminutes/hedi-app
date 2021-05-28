import { Body } from "@/modules/model/components";

export interface IBodyProps extends Body {}

export function transformBody(props: IBodyProps) {
  const { body, ...rest } = props;

  return { body, rest };
}
