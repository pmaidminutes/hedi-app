import { IEntity, IEntityLocalized, ILanguage } from "@/modules/model";
export interface IFooter {
  translations?: IEntityLocalized[];
  links?: IEntity[];
  languages: ILanguage[]
}

export function useFooter(props: IFooter) {
  const {translations, links, languages} = props

  return {translations, links, languages}
}