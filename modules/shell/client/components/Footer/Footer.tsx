import React from "react";
import { transformFooter, IFooter } from "./transformFooter";
import { Link } from "carbon-components-react";
import { LanguageSwitch } from "../LanguageSwitch";
import { isLink } from "@/modules/model/components";

export const Footer = (props: IFooter) => {
  const { footer, languageSwitchLinks, shellConfig } = transformFooter(props);
  return (
    <footer aria-label="footer" className="hedi--footer">
      {footer &&
        footer.map((link, index) => {
          if (isLink(link)) {
            return (
              <Link
                key={link.labelText + index}
                href={link.href}
                title={link.labelText}>
                {link.labelText}
              </Link>
            );
          }
        })}
      {languageSwitchLinks ? (
        <LanguageSwitch
          links={languageSwitchLinks}
          direction="top"
          config={shellConfig}
        />
      ) : null}
    </footer>
  );
};
