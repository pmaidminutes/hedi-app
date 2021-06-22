import { AudioPlayer } from "@/modules/common/components";
import { transformArticle, IArticleProps } from "./transformArticle";
import { ComponentRenderer } from "@/modules/components/client";
import { Column, Grid, Row } from "carbon-components-react";
import { Aside } from "../Aside";
import { ActionBar } from "../ActionBar";
export const Article = (props: IArticleProps): JSX.Element => {
  const {
    headline,
    components,
    headlines,
    actions,
    anchors,
    route,
  } = transformArticle(props);
  // TODO needs rework when we know the finished layout
  return (
    <article>
      <Grid>
        <Row>
          <Column lg={{ span: 10, offset: 2 }}>
            <ActionBar actions={actions} />
            {components && (
              <ComponentRenderer route={route} components={components} />
            )}
          </Column>
          <Column lg={3} sm={0}>
            <Aside actions={actions} anchors={anchors} />
          </Column>
        </Row>
      </Grid>
    </article>
  );
};
