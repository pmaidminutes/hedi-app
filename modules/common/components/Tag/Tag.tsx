import { IService, TagType } from "@/modules/model";

import { Tag as CarbonTag, Link } from "carbon-components-react";

interface ITagProps {
  tag: IService;
  type?: TagType | null;
}
export const Tag = ({ tag, type }: ITagProps): JSX.Element => {
  return (
    <CarbonTag type={type ? type : "magenta"}>
      <Link href={tag.route} className="bx--tag__label hedi-unstyled-link">
        {tag.label}
      </Link>
    </CarbonTag>
  );
};
