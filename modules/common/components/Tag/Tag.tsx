import { ITag } from "@/modules/model";

import { Tag as CarbonTag, Link } from "carbon-components-react";

export const Tag = ({ tag }: { tag: ITag }): JSX.Element => {
  return (
    <CarbonTag type={"magenta"}>
      <Link
        href={`/search/${tag.label}`}
        className="bx--tag__label hedi-unstyled-link">
        {tag.label}
      </Link>
    </CarbonTag>
  );
};
