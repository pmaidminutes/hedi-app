import { IService, TagType } from "@/modules/model";
import { Tag } from "../Tag";

interface ITagList {
  tags?: IService[];
  headline?: String;
  tagType?: TagType;
}

export const TagList = ({ tags, headline, tagType }: ITagList): JSX.Element => {
  return (
    <aside className="hedi__tag-list">
      {headline ? <h3>{headline}</h3> : null}

      {tags && tags?.length > 0
        ? tags.map(tag => (
            <Tag type={tagType ?? null} tag={tag} key={tag.route} />
          ))
        : null}
    </aside>
  );
};
