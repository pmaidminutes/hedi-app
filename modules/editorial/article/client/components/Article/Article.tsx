import { AudioPlayer } from "@/modules/common/components";
import { transformArticle, IArticleProps } from "./transformArticle";
import { ComponentRenderer } from "@/modules/components/client";
export const Article = (props: IArticleProps): JSX.Element => {
  const { headline, components, headlines } = transformArticle(props);
  // TODO needs rework when we know the finished layout
  return (
    <article>
      {components && <ComponentRenderer components={components} />}
    </article>
  );
};
