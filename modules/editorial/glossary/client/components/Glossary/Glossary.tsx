import { GlossaryGroup } from "../GlossaryGroup";
import { GlossaryTerm } from "../GlossaryTerm";
import { transformGlossary, IGlossaryProps } from "./transformGlossary";

export const Glossary = (props: IGlossaryProps): JSX.Element => {
  const { terms, defaultLocale, glossaryUrlTerm } = transformGlossary(props);

  //TODO to include hash value to anchor on page load, hash in URL doesnt work

  return (
    <>
      {terms.map(glossary => (
        <GlossaryTerm {...glossary} />
      ))}
    </>
  );
};
