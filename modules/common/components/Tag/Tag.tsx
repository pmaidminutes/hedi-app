import { ITag } from "@/common/model/cms";
import Link from "next/link";

export const Tag = ({ tag }: { tag: ITag }): JSX.Element => {
  return (
    <button className="bx--tag bx--tag--magenta">
      <Link href={`/search/${tag.label}`} passHref>
        <a className="bx--tag__label hedi-unstyled-link">{tag.label}</a>
      </Link>
    </button>
  );
};
