import {
  IComponent,
  ILabelComponent,
  ILinkComponent,
} from "@/modules/components";
import { IGlossaryKeyGroup } from "../../../types";
import { IGlossaryProps } from "./Glossary";

export function transformGlossaryGroupComponents(props: IGlossaryProps) {
  const keyAlphabetArray: string[] = [];
  props.glossaryKeyGroups.forEach((obj: IGlossaryKeyGroup) =>
    keyAlphabetArray.push(obj.keyChar)
  );

  const alphabetLinks: IComponent[] = [];
  const alphabetsArray = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  alphabetsArray.forEach((alphabet: string) => {
    const labelObject: ILabelComponent = {
      kind: "Label",
      labelKind: "h3",
      text: alphabet,
      id: alphabet + "_label",
      className: "hedi--alphabet-label",
    };

    const linkObject: ILinkComponent = {
      kind: "Link",
      href: "#" + alphabet,
      labelText: alphabet,
      id: alphabet + "_link",
    };
    alphabetLinks.push(
      keyAlphabetArray.indexOf(alphabet) != -1 ? linkObject : labelObject
    );
  });
  return { alphabetLinks };
}
