import { IAppPage } from "@/modules/common/types";
import { SimpleAppPageView } from "@/modules/common/components/AppPage";
import Link from "next/link";

export const UserFeedbackThanksView = ({ content }: { content: IAppPage }) => {
  return (
    <SimpleAppPageView content={content} rootCssClass="feedback-thanks">
      <div className="hedi-app-page-link-buttons">
        {content.elements.map(element => (
          <Link key={element.identifier + content.lang} href={"#"} passHref>
            <a href={"#" /* redirect to correct location */}>{element.value}</a>
          </Link>
        ))}
      </div>
    </SimpleAppPageView>
  );
};
