import {
  ITaxonomy,
  ITranslatable,
  ITypename,
  IURLPath,
  SlugFields,
  TaxonomyFields,
  TranslationsFields,
} from "@/common/model/cms";

export interface IGlossaryTerm extends ITaxonomy {
  description: string;
  translations: IGlossaryTerm[];
}

export const GlossaryTermFields = `
  ${TaxonomyFields}
  description
  translations(excludeSelf: $excludeSelf) {
    ${TaxonomyFields}
    description
  }
`;

export interface IGlossaryGroup {
  key: string;
  terms: IGlossaryTerm[];
}

export interface IGroupedGlossary extends ITypename, ITranslatable {
  groups: IGlossaryGroup[];
  translations: (ITranslatable & IURLPath)[];
}

export interface IGlossary extends ITypename, ITranslatable {
  translations: (ITranslatable & IURLPath)[];
  terms: IGlossaryTerm[];
}

export const GlossaryFields = `
  ${TranslationsFields}
  translations(excludeSelf: $excludeSelf) {
    ${SlugFields}
  }
  terms {
    ${GlossaryTermFields}
  }
`;
