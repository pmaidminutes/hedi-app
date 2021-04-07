import { TagList } from "@/modules/common/components";
import { Tile } from "carbon-components-react";
import { useServices, IServicesProps } from "./useServices";
import BabyOnHand from "./assets/baby.svg";

export const Services = (props: IServicesProps) => {
  const { headline, services, tagType, headlineType } = useServices(props);
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
