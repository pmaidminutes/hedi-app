import React from "react";
import { ClickableTile, AspectRatio } from "carbon-components-react";
import Link from "next/link";
import { BreadCrumb } from "@/modules/shell/client/components";
import { Image } from "@/modules/components";
import { transformArticleEntry } from "./transformArticleEntry";
import { Body } from "@/modules/components";
import { HTMLWithNextImage } from "@/modules/react/html/HTMLWithNextImage";
import { IArticleEntryProps } from "./transformArticleEntry";

export const ArticleEntry = (props: IArticleEntryProps) => {
  const {
    label,
    breadcrumbData,
    summary,
    image,
    route,
    background,
    gridClass,
    entryType,
    entryClass,
    textwrapClass,
  } = transformArticleEntry(props);
  console.log({ entryType });
  return (
    <div className={entryClass}>
      <Link href={route} passHref>
        <ClickableTile href={route} light={true}>
          <div className={gridClass}>
            {image && (
              <AspectRatio
                ratio="1x1"
                className="hedi--article-entry__grid--image"
                style={{ backgroundColor: background }}>
                <Image
                  objectFit="cover"
                  objectPosition="top"
                  layout="fill"
                  {...image}
                />
              </AspectRatio>
            )}

            <div className="hedi--article-entry__grid--content">
              <BreadCrumb {...breadcrumbData} />
              <h4>
                <HTMLWithNextImage data={label} />
              </h4>
              {entryType !== "minimal" && (
                <div className={textwrapClass}>
                  {/* TODO remove p tags after Body is migrated with p tag */}
                  <p>
                    <Body body={summary} />
                  </p>
                </div>
              )}
            </div>
          </div>
        </ClickableTile>
      </Link>
    </div>
  );
};
