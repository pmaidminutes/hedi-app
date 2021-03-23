import React from "react";
import { Link } from "carbon-components-react";
import { IEntity, IEntityTranslated, IEntityLocalized } from "@/modules/model";
import { LanguageSwitch } from "../LanguageSwitch";
interface IFooter {
  translations?: IEntityLocalized[];
  links?: IEntity[];
}

type FooterProps = Pick<
  IEntityTranslated<IEntityLocalized>,
  "label" | "translations"
>;

export const Footer: React.FunctionComponent<IFooter> = ({
  links,
  translations,
}) => {
  console.log({links}, {translations})
  return (
    <footer aria-label="footer" className="hedi--footer">
      {links
        ? links.map((link, index) => {
            return (
              <Link
                key={link.label + index}
                href={link.route}
                title={link.label}>
                {link.label}
              </Link>
            );
          })
        : null}
      {translations ? <LanguageSwitch translations={translations} type="text"/> : null}
    </footer>
  );
};
