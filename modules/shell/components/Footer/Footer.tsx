import React from "react";
import { Link } from "carbon-components-react";
import { IEntity } from "@/modules/model";

interface IFooter {
  data?: IEntity[];
}

export const Footer = (props: IFooter) => {
  const { data } = props;
  if (data?.length === 0 || data === undefined) return null;
  return (
    <footer aria-label="footer" className="hedi__footer">
      {data.map((link, index) => {
        return (
          <Link key={link.label + index} href={link.route} title={link.label}>
            {link.label}
          </Link>
        );
      })}
    </footer>
  );
};
