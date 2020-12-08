import { IGlossaryEntry } from "@/modules/editorial/types";
import { AccordionItem } from "carbon-components-react";
interface GlossaryProps {
  glossaryItem: IGlossaryEntry;
  glossaryUrlTerm: string;
  defaultLocale: string;
}

export const GlossaryEntry = (props: GlossaryProps) => {
  const glossaryItem = props.glossaryItem;
  return (
    <AccordionItem
      title={glossaryItem.label}
      open={glossaryItem.slug.includes(props.glossaryUrlTerm) ? true : false}>
      <h4>
        {" "}
        {glossaryItem.translations.map((translation: IGlossaryEntry) =>
          translation.langcode === props.defaultLocale
            ? "Auf Deutsch: " + translation.label
            : ""
        )}
      </h4>
      {
        //TODO to remove substring when UI look and feel is made proper
      }
      <div dangerouslySetInnerHTML={{
          __html: glossaryItem.body.substring(0, 300),
        }}></div>
    </AccordionItem>
  );
};
