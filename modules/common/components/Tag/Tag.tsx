import { ITag, TagType } from "@/modules/model";

import { Tag as CarbonTag, Link } from "carbon-components-react";

interface ITagProps {
  tag: ITag;
  type?: TagType | null;
}
export const Tag = ({ tag, type }: ITagProps): JSX.Element => {
  return (
    <CarbonTag type={type ? type : "blue"}>
      {/* <Link href={tag.route} className="bx--tag__label hedi-unstyled-link">
        {tag.label}
      </Link> */}
      <span className="bx--tag__label hedi-unstyled-link">{tag.label}</span>
    </CarbonTag>
  );
};
