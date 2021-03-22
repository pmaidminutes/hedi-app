import { TagList } from "@/modules/common/components";
import { Tile } from "carbon-components-react";
import { useServices, IServicesProps } from "./useServices";

export const Services = (props: IServicesProps) => {
  const { headline, services, tagType } = useServices(props);
  if (services) {
    return (
      <section className="hedi--profile-services hedi--profile--tile">
        <Tile>
          {/* TODO import as svg, alt*/}
          <img src="/images/baby_on_hand.svg" alt="" />
          <TagList
            tags={services}
            headline={headline}
            tagType={tagType}></TagList>
        </Tile>
      </section>
    );
  } else return null;
};
