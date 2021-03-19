import { ITag, TagType } from "@/modules/model";
import { Tag } from "../Tag";
import { Grid, Row, Column } from "carbon-components-react";

interface ITagList {
  tags: ITag[];
  headline?: String;
  tagType?: TagType;
}

export const TagList = ({ tags, headline, tagType }: ITagList): JSX.Element => {
  return (
    <aside className="hedi__tag-list">
      {headline ? <h3>{headline}</h3> : null}

      {tags.map(tag => (
        <Tag type={tagType ?? null} tag={tag} key={tag.route} />
      ))}
    </aside>
  );
};
