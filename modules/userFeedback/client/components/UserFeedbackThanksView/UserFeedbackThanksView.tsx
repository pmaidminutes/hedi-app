import { IAppPage } from "@/modules/common/types";
import { SimplePageView } from "@/modules/simplePage/client/components";
import Link from "next/link";

export const UserFeedbackThanksView = ({ content }: { content: IAppPage }) => {
  return (
    <SimplePageView
      url="/Pregnancy_pink80.svg"
      alt="Beschreibung des Bildes"
      content={content}>
      <div className="hedi-app-page-link-buttons">
        {content.elements.map(element => (
          <Link key={element.identifier + content.lang} href={"#"} passHref>
            <a href={"#" /* redirect to correct location */}>{element.value}</a>
          </Link>
        ))}
      </div>
    </SimplePageView>
  );
};
