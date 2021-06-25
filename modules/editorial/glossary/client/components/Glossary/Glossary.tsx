import { IGlossaryKeyGroup, IGlossaryViewDefinition } from "../../../types";
import { GlossaryGroup } from "../GlossaryGroup";
import { transformGlossary, transformGlossaryGroupComponents } from "..";
import { IComponent, isLabel, isLink, Label, Link } from "@/modules/components";

export type IGlossaryProps = IGlossaryViewDefinition & IGlossaryConfig;

export interface IGlossaryConfig {}

export const Glossary = ({ props }: { props: IGlossaryProps }): JSX.Element => {
  const { alphabetLinks } = transformGlossaryGroupComponents(props);
  const {
    glossaryKeyGroups,
    defaultLocale,
    glossaryUrlTerm,
  } = transformGlossary(props);

  //TODO to include hash value to anchor on page load, hash in URL doesnt work

  return (
    <>
      {alphabetLinks && (
        <>
          <div className="hedi--alphabet-links--wrap">
            {alphabetLinks.map((alphabetComponent: IComponent) =>
              isLabel(alphabetComponent) ? (
                <Label {...alphabetComponent} />
              ) : isLink(alphabetComponent) ? (
                <Link {...alphabetComponent} className="hedi--alphabet-links" />
              ) : (
                ""
              )
            )}
          </div>
        </>
      )}

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
