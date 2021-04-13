import { IEntity } from "@/modules/model";

export function transformShell(content: IEntity) {
  const { label } = content;

  return { label };
}
