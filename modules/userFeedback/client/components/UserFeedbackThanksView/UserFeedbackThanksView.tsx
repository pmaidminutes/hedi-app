import { SimplePageView } from "@/modules/simplePage/client/components";
import { Button } from "carbon-components-react";
import { ArrowLeft16 } from "@carbon/icons-react";
import { useFeedbackThanksView } from "./useFeedbackThanksView";
import { useRouter } from "next/router";
import {
  getUIElement,
  getUIElementRedirectRoute,
} from "@/modules/common/utils";
import { IUserFeedbackThanksView } from "@/modules/userFeedback/types";

export const UserFeedbackThanksView = (props: {
  content: IUserFeedbackThanksView;
}) => {
  const { content, elements, links } = useFeedbackThanksView(props);
  const router = useRouter();
  const backRoute = getUIElementRedirectRoute("back_page", elements, links);
  const element = getUIElement("back", elements);
  return (
    <SimplePageView
      url={process.env.NEXT_PUBLIC_IMG_HEADER_SIMPLE}
      content={content}>
      <div className="hedi-app-page-link-buttons">
        {
          <Button
            key={element?.identifier + content.lang}
            tooltip={element?.value}
            renderIcon={ArrowLeft16}
            kind="ghost"
            onClick={() => router.push(backRoute)}>
            {element?.value}
          </Button>
        }
      </div>
    </SimplePageView>
  );
};
