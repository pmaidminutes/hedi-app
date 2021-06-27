import React from "react";
import { transformFooter, IFooter } from "./transformFooter";
import { Link } from "carbon-components-react";
import { LanguageSwitch } from "../LanguageSwitch";
import { isLink } from "@/modules/components/types";
import { Button } from "@/modules/components";

export const Footer = (props: IFooter) => {
  const { footer, languageSwitchLinks, shellConfig } = transformFooter(props);
  return (
    <footer aria-label="footer" className="hedi--footer">
      <nav className="hedi--footer__nav">
        <ul aria-label="Footer Navigation" className="hedi--footer__menu-bar">
          {footer &&
            footer.map((link: any, index: number) => {
              if (isLink(link)) {
                return (
                  <li key={link.labelText + index}>
                    <Link
                      href={link.href}
                      title={link.labelText}
                      tabIndex={0}
                      className="hedi--footer__menu-item">
                      {link.labelText}
                    </Link>
                  </li>
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
        </ul>
      </nav>
    </footer>
  );
};
