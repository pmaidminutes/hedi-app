import Link from "next/link";
// Components
import { Tile, UnorderedList, ListItem } from "carbon-components-react";
// Types
import { ICategory } from "@/modules/editorial/types";

interface ICategoryProps {
  content: ICategory;
}

export const Category = ({ content }: ICategoryProps) => {
  const { categories, label, articles } = content;
  return (
    <>
      <h1>{label}</h1>
      {categories.length > 0 && (
        <Tile>
          <h2>Subcategories</h2>
          <UnorderedList>
            {categories.map((category, index) => (
              <ListItem key={index}>
                <Link href={category.urlpath}>{category.label}</Link>
              </ListItem>
            ))}
          </UnorderedList>
        </Tile>
      )}
      {articles.length > 0 && (
        <Tile>
          <h2>Articles</h2>
          <UnorderedList>
            {articles.map((article, index) => (
              <ListItem key={index}>
                <Link href={article.urlpath}>{article.label}</Link>
                <div
                  dangerouslySetInnerHTML={{
                    __html: article.summary,
                  }}
                />
              </ListItem>
            ))}
          </UnorderedList>
        </Tile>
      )}
    </>
  );
};
