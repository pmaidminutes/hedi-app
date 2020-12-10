// Types
import { IArticle } from "@/modules/editorial/types";

interface IArticleProps {
  content: IArticle;
}

export const Article = ({ content }: IArticleProps) => {
  const { label, body, category } = content;

  return (
    <div className="bx--col bx--no-gutter bx--grid">
      <div className="bx--row">
        <div className="bx--col bx--col-auto">
          <div className="bx--snippet bx--skeleton bx--snippet--multi bx--aspect-ratio bx--aspect-ratio--2x1">
            poster image
          </div>
        </div>
        <div className="bx--col">
          <h1>{label}</h1>
          <div className="bx--text bx--heading">maybe subtitle</div>
          <p>audio</p>
          <div className="bx--icon--skeleton"></div>
        </div>
      </div>
      <div className="bx--row bx--row-padding">
        <div className="bx--col">
          <div
            className="bx--text"
            dangerouslySetInnerHTML={{
              __html: body,
            }}></div>
        </div>
      </div>

      <div className="bx--row bx--row-padding">
        <div className="bx--col">
          <span className="bx--tag">{category.label}</span>
        </div>
      </div>
    </div>
  );
};
