import { FunctionComponent } from "react";
import Link from "next/link";

interface CustomSideNavLinkProps {
  href: string;
}

export const CustomSideNavLink: FunctionComponent<CustomSideNavLinkProps> = ({
  href,
  children,
}) => {
  return (
    <li className="bx--side-nav__item">
      <Link href={href} passHref>
        <a className="bx--side-nav__link">
          <span className="bx--side-nav__link-text">{children}</span>
        </a>
      </Link>
    </li>
  );
};
