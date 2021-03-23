import { IEntity, IEntityLocalized } from "@/modules/model";
export interface IFooter {
  translations?: IEntityLocalized[];
  links?: IEntity[];
}

export function useFooter(props: IFooter) {
  const {translations, links} = props

  return {translations, links}
}