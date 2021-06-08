import { AudioPlayer } from "@/modules/common/components";
import { transformArticle, IArticleProps } from "./transformArticle";

export const Article = (props: IArticleProps): JSX.Element => {
  const { headline } = transformArticle(props);
  // TODO needs rework when we know the finished layout
  return <article></article>;
};
