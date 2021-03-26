import { ITag, TagType, IService } from "@/modules/model";
import { Tag } from "../Tag";

interface ITagList {
  tags?: IService[];
  headline?: String;
  tagType?: TagType;
  headlineType?: "h3" | "h5";
}

export const TagList = ({
  tags,
  headline,
  tagType,
  headlineType,
}: ITagList): JSX.Element => {
  const headlineElement =
    headlineType === "h3" ? <h3>{headline}</h3> : <h5>{headline}</h5>;

  return (
    <aside className="hedi__tag-list">
      {headline ? headlineElement : null}

      {tags && tags?.length > 0
        ? tags.map(tag => (
            <Tag type={tagType ?? null} tag={tag} key={tag.route} />
          ))
        : null}
    </aside>
  );
};
