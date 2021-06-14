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
    <div className="">
      <Link href={route} passHref>
        <a href={route}>
          {image && (
            <AspectRatio ratio="2x1">
              <Image {...image} />
            </AspectRatio>
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
