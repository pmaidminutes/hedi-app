import React from "react";
import { useFooter, IFooter } from "./useFooter";
import { Link } from "carbon-components-react";
import { LanguageSwitch } from "../LanguageSwitch";

export const Footer: React.FunctionComponent<IFooter> = props => {
  const { links, translations } = useFooter(props);
  console.log({ links }, { translations });
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
      {translations ? (
        <LanguageSwitch translations={translations} type="text" />
      ) : null}
    </footer>
  );
};
