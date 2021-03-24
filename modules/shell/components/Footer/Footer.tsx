import React from "react";
import { useFooter, IFooter } from "./useFooter";
import { Link } from "carbon-components-react";
import { LanguageSwitch } from "../LanguageSwitch";

export const Footer = (props: IFooter) => {
  const { footer, languageSwitchLinks } = useFooter(props);
  return (
    <footer aria-label="footer" className="hedi--footer">
      {footer
        ? footer.map((link, index) => {
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
      {languageSwitchLinks ? (
        <LanguageSwitch links={languageSwitchLinks} direction="top" />
      ) : null}
    </footer>
  );
};
