import { LanguageFields } from "@/modules/model";
export const LanguagesGQL = `languages(lang: $lang){${LanguageFields}}`;
