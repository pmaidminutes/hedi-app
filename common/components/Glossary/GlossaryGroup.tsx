import { IGlossaryEntry, IGroupGlossary } from "@/modules/editorial/types";
import { AspectRatio, Accordion } from "carbon-components-react";
import { GlossaryEntry } from "./GlossaryEntry";
interface GlossaryGroupProps {
  glossaryGroup: IGroupGlossary;
  glossaryUrlTerm: string;
  defaultLocale: string;
}
export const GlossaryGroup = (props: GlossaryGroupProps) => {
  const glossaryGroup = props.glossaryGroup;

  return (
    <AspectRatio ratio="1x1">
      <h2 style={{ fontStyle: "bold", backgroundColor: "lightgray" }}>
        {glossaryGroup.abbrev}
      </h2>
      <Accordion>
        {glossaryGroup.glossaries.map((glossaryItem: IGlossaryEntry, index) => (
          <GlossaryEntry
            key={index}
            glossaryItem={glossaryItem}
            glossaryUrlTerm={props.glossaryUrlTerm}
            defaultLocale={props.defaultLocale}
          />
        ))}
      </Accordion>
    </AspectRatio>
  );
};
