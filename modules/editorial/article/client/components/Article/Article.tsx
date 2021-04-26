import { AudioPlayer } from "@/modules/common/components";
import { HTMLWithNextImage } from "@/modules/react/html";
import { useArticle, IArticleProps } from "./useArticle";

export const Article = (props: IArticleProps): JSX.Element => {
  const { headline, body, audioSrc, tags, hasAudio, hasTags } = useArticle(
    props
  );

  return (
    <article>
      <h1>{headline}</h1>
      {hasAudio ? <AudioPlayer src={audioSrc ?? ""} /> : null}

      <HTMLWithNextImage data={body} />
    </article>
  );
};
