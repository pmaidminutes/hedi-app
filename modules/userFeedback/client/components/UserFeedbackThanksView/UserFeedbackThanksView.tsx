import { Button } from "carbon-components-react";
import { ArrowLeft16 } from "@carbon/icons-react";
import {
  IUserFeedbackThanksProps,
  useFeedbackThanksView,
} from "./useFeedbackThanksView";
import { useRouter } from "next/router";

export const UserFeedbackThanksView = (props: IUserFeedbackThanksProps) => {
  const { backRoute, key, tooltip, buttonValue } = useFeedbackThanksView(props);
  const router = useRouter();

  return (
    <div className="hedi-app-page-link-buttons">
      {
        <Button
          key={key}
          tooltip={tooltip}
          renderIcon={ArrowLeft16}
          kind="ghost"
          onClick={() => router.push(backRoute)}>
          {buttonValue}
        </Button>
      }
    </div>
  );
};
