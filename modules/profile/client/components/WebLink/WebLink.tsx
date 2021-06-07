import { Link, LinkProps } from "carbon-components-react";
import { Launch16 } from "@carbon/icons-react";
import { prettifyUrl } from "@/modules/common/utils";
import { IWebsite } from "../../../types/dataTypes";

export const WebLink = (props: Partial<IWebsite> & LinkProps) => {
  const { dataKind, website, ...rest } = props;
  // TODO dataKind
  const prettyUrl = website ? prettifyUrl(website) : null;
  return (
    <Link href={website} target="_blank" className="bx--link--lg" {...rest}>
      {prettyUrl} <Launch16 />
    </Link>
  );
};
