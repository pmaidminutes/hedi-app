import { ITag, TagType } from "@/modules/model";
import { TagList } from "@/modules/common/components";
import { Tile } from "carbon-components-react";

interface IService {
  tags?: ITag[];
  headline?: string;
  tagType?: TagType;
}

export const Services = ({
  tags = [],
  headline = "Headline",
  tagType = "blue",
}: IService) => {
  return (
    <section className="hedi__profile-services hedi__profile--tile">
      <Tile>
        {/* TODO import as svg, alt*/}
        <img src="/images/baby_on_hand.svg" alt="" />
        {/* TODO title apppage */}
        <TagList tags={tags} headline={headline} tagType={tagType}></TagList>
      </Tile>
    </section>
  );
};
