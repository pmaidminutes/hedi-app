import { transformArticle, IArticleProps } from "./transformArticle";
import { ComponentRenderer } from "@/modules/components/client";
import { Column, Row } from "carbon-components-react";
import { ActionBar } from "../ActionBar";
import { CopyLinkToClipboard } from "@/modules/common/components";
export const Article = (props: IArticleProps): JSX.Element => {
  const { components, actions, route } = transformArticle(props);
  // TODO needs rework when we know the finished layout
  return (
    <article>
      <Row>
        <Column lg={{ span: 10, offset: 3 }} md={{ span: 6, offset: 1 }}>
          <ActionBar actions={actions}>
            <CopyLinkToClipboard
              type="actionbaritem"
              description="Link kopieren"
              route={route}
            />
          </ActionBar>
          {components && (
            <ComponentRenderer route={route} components={components} />
          )}
        </Column>
      </Row>
    </article>
  );
};
