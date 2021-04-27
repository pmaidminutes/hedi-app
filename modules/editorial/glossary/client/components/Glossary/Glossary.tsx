import { GlossaryGroup } from "../GlossaryGroup";
import { Grid } from "carbon-components-react";
import { transformGlossary, IGlossaryProps } from "./transformGlossary";

export const Glossary = (props: IGlossaryProps): JSX.Element => {
  const { groups, defaultLocale, glossaryUrlTerm } = transformGlossary(props);

  //TODO to include hash value to anchor on page load, hash in URL doesnt work

  return (
    <>
      {groups.map(glossaryGroup => (
        <GlossaryGroup
          key={glossaryGroup.key}
          glossaryGroup={glossaryGroup}
          translationLang={defaultLocale}
          selectedTerm={glossaryUrlTerm}
        />
      ))}
    </>
  );
};
