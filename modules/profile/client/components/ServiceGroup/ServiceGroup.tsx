import { TagList } from "@/modules/common/components";
import { Tile } from "carbon-components-react";
import { transformServiceGroup } from "./transformServiceGroup";
import BabyOnHand from "./assets/baby.svg";
import { IServiceGroupProps } from "./IServiceGroupProps";

export const ServiceGroup = (props: IServiceGroupProps) => {
  const { headline, services, tagType, headlineType } = transformServiceGroup(
    props
  );
  if (services) {
    return (
      <section className="hedi--profile-services hedi--profile--tile">
        <Tile>
          <BabyOnHand />
          <TagList
            headlineType={headlineType}
            tags={services}
            headline={headline}
            tagType={tagType}></TagList>
        </Tile>
      </section>
    );
  } else return null;
};
