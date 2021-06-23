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
    <div className="hedi__categoryentry">
      <Link href={route} passHref>
        <a href={route}>
          {image && (
            <div style={{ backgroundColor: image.color }}>
              <AspectRatio ratio="2x1">
                <Image {...image} />
              </AspectRatio>
            </div>
          )}
          <h4
            dangerouslySetInnerHTML={{
              __html: label,
            }}></h4>
        </a>
      </Link>
    </div>
  );
};
