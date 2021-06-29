import React from "react";
import { IArticleEntry } from "../../../types";
import {
  Row,
  Column,
  ClickableTile,
  AspectRatio,
} from "carbon-components-react";
import Link from "next/link";
import { BreadCrumb } from "@/modules/shell/client/components";
import { Image } from "@/modules/components";
import { transformArticleTeaserEntry } from "./transformArticleTeaserEntry";
import { Body } from "@/modules/components";
import { HTMLWithNextImage } from "@/modules/react/html/HTMLWithNextImage";

export const ArticleTeaserEntry = (props: IArticleEntry) => {
  const {
    label,
    breadcrumbData,
    summary,
    image,
    route,
    background,
    gridClass,
  } = transformArticleTeaserEntry(props);
  return (
    <Row className="hedi--article-teaser__entry">
      <Column sm={4} md={6} lg={12}>
        <Link href={route} passHref>
          <ClickableTile href={route} light={true}>
            <div className={gridClass}>
              {image && (
                <AspectRatio
                  ratio="1x1"
                  className="hedi--article-teaser__entry--grid--image"
                  style={{ backgroundColor: background }}>
                  <Image
                    objectFit="cover"
                    objectPosition="top"
                    layout="fill"
                    {...image}
                  />
                </AspectRatio>
              )}

              <div className="hedi--article-teaser__entry--grid--content">
                <BreadCrumb {...breadcrumbData} />
                <h4>
                  <HTMLWithNextImage data={label} />
                </h4>
                <div className="hedi--article-teaser__entry--grid--content--text-wrap">
                  <Body {...summary} />
                </div>
              </div>
            </div>
          </ClickableTile>
        </Link>
      </Column>
    </Row>
  );
};
