import { SimplePageView } from "@/modules/simplePage/client/components";
import { Button } from "carbon-components-react";
import { ArrowLeft16 } from "@carbon/icons-react";
import {
  IUserFeedbackThanksProps,
  useFeedbackThanksView,
} from "./useFeedbackThanksView";

export const UserFeedbackThanksView = (props: IUserFeedbackThanksProps) => {
  const { content, elements } = useFeedbackThanksView(props);

  return (
    <SimplePageView url="/images/Baby_Simple_blue.svg" content={content}>
      <div className="hedi-app-page-link-buttons">
        {elements.map(element => (
          <Button
            key={element.identifier + content.lang}
            tooltip={element.value}
            renderIcon={ArrowLeft16}
            kind="ghost"
            href={"/" + content.lang + "/user/profile"}>
            {element.value}
          </Button>
        ))}
      </div>
    </SimplePageView>
  );
};
