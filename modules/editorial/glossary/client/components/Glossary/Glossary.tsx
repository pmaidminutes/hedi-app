import { IGlossaryGroup } from "../../../types";
import { GlossaryGroup } from "../GlossaryGroup";
import { transformGlossary } from "./transformGlossary";

export type IGlossaryProps = IGlossaryGroup &
  IGlossaryDefinition &
  IGlossaryConfig;

export interface IGlossaryDefinition {
  // for now the entire page content is backend data
}

export interface IGlossaryConfig {}

export const Glossary = ({ props }: { props: IGlossaryProps }): JSX.Element => {
  const { keyGroups, defaultLocale, glossaryUrlTerm } = transformGlossary(
    props
  );

  //TODO to include hash value to anchor on page load, hash in URL doesnt work

  return (
    <>
      {keyGroups.map(keyGroup => (
        <GlossaryGroup
          key={keyGroup.keyChar}
          glossaryKeyGroup={keyGroup}
          translationLang={defaultLocale}
          selectedTerm={glossaryUrlTerm}
        />
      ))}
    </>
  );
};
