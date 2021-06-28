// import Image from "next/image";
import Link from "next/link";
import { Image } from "@/modules/components";
import { AspectRatio } from "carbon-components-react";
import {
  transformCategoryEntry,
  ICategoryEntryProps,
} from "./transformCategoryEntry";

export const CategoryEntry = (props: ICategoryEntryProps): JSX.Element => {
  const { route, image, label } = transformCategoryEntry(props);

  return (
    <div className="hedi--category-entry">
      <Link href={route} passHref>
        <a href={route}>
          {image && (
            <div
              className="hedi--category-entry__image-wrap"
              style={{ backgroundColor: image.color }}>
              <AspectRatio ratio="2x1">
                <Image {...image} />
              </AspectRatio>
            </div>
          )}
          <h3
            dangerouslySetInnerHTML={{
              __html: label,
            }}></h3>
        </a>
      </Link>
    </div>
  );
};
