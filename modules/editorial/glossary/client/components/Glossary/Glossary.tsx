import { IGlossaryKeyGroup, IGlossaryViewDefinition } from "../../../types";
import { GlossaryGroup } from "../GlossaryGroup";
import { transformGlossary } from "./transformGlossary";

export type IGlossaryProps = IGlossaryViewDefinition & IGlossaryConfig;

export interface IGlossaryConfig {}

export const Glossary = ({ props }: { props: IGlossaryProps }): JSX.Element => {
  const {
    glossaryKeyGroups,
    defaultLocale,
    glossaryUrlTerm,
  } = transformGlossary(props);

  //TODO to include hash value to anchor on page load, hash in URL doesnt work

  return (
    <>
      {glossaryKeyGroups.map((glossarykeyGroup: IGlossaryKeyGroup) => (
        <GlossaryGroup
          key={glossarykeyGroup.keyChar}
          glossaryKeyGroup={glossarykeyGroup}
          translationLang={defaultLocale}
          selectedTerm={glossaryUrlTerm}
        />
      ))}
    </>
  );
};
