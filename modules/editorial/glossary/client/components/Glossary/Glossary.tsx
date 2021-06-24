import { IGlossaryKeyGroup, IGlossaryViewDefinition } from "../../../types";
import { GlossaryGroup } from "../GlossaryGroup";
import { transformGlossary } from "./transformGlossary";
import { transformGlossaryComponents } from "./transformGlossaryComponents";
import { Label, Link } from "@/modules/components";
import { Column, Row } from "carbon-components-react";

export type IGlossaryProps = IGlossaryViewDefinition & IGlossaryConfig;

export interface IGlossaryConfig {}

export const Glossary = ({ props }: { props: IGlossaryProps }): JSX.Element => {
  const {
    glossaryKeyGroups,
    defaultLocale,
    glossaryUrlTerm,
  } = transformGlossary(props);
  const { jumpComponent, groupAlphabetLinks } = transformGlossaryComponents(
    props.components
  );

  //TODO to include hash value to anchor on page load, hash in URL doesnt work

  return (
    <>
      {jumpComponent && groupAlphabetLinks && (
        <>
          {" "}
          <Label {...jumpComponent} />
          {glossaryKeyGroups.map((glossarykeyAlphabet: IGlossaryKeyGroup) => (
            <Link
              style={{ padding: "20px", font: { size: "2rem" } }}
              {...groupAlphabetLinks}
              key={glossarykeyAlphabet.keyChar}
              href={"#" + glossarykeyAlphabet.keyChar}
              labelText={glossarykeyAlphabet.keyChar}
            />
          ))}
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
