import { ITag, TagType } from "@/modules/model";
import { Tag } from "../Tag";

interface ITagList {
  tags?: ITag[];
  headline?: String;
  tagType?: TagType;
}

export const TagList = ({ tags, headline, tagType }: ITagList): JSX.Element => {
  return (
    <aside className="hedi__tag-list">
      {headline ? <h5>{headline}</h5> : null}

      {tags && tags?.length > 0
        ? tags.map(tag => (
            <Tag type={tagType ?? null} tag={tag} key={tag.route} />
          ))
        : null}
    </aside>
  );
};
