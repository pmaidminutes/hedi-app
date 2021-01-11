import { ITagged } from "@/modules/model";
import { Tag } from "../Tag";

export const TagList = ({ tags }: ITagged): JSX.Element => {
  return (
    <div className="bx--grid mb-l-sm">
      <h3 className="mt-s-md">Browse by tags</h3>
      <div className="bx--row mt-s-sm">
        <div className="bx--col-sm-4 bx--col-md-6 bx--col-lg-10">
          {tags.map(tag => (
            <Tag tag={tag} key={tag.route} />
          ))}
        </div>
      </div>
    </div>
  );
};
