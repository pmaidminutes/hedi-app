import React from "react";
import { Link } from "carbon-components-react";
import { IEntity, IEntityTranslated, IEntityLocalized } from "@/modules/model";
import { LanguageSwitch } from "../LanguageSwitch";
interface IFooter {
  data?: IEntity[];
}

type FooterProps = Pick<
  IEntityTranslated<IEntityLocalized>,
  "label" | "translations"
>;

export const Footer: React.FunctionComponent<FooterProps> = ({
  label,
  translations,
}) => {
  // const { data } = props;
  // if (data?.length === 0 || data === undefined) return null;
  return (
    <footer aria-label="footer" className="hedi__footer">
      {/* {data.map((link, index) => {
        return (
          <Link key={link.label + index} href={link.route} title={link.label}>
            {link.label}
          </Link>
        );
      })} */}
      <LanguageSwitch translations={translations} />
    </footer>
  );
};
